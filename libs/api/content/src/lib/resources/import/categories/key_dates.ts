import { firstRow } from '@sovereign-university/database';
import { Resource } from '@sovereign-university/types';

import { ChangedResource } from '..';
import { Dependencies } from '../../../dependencies';
import { separateContentFiles, yamlToObject } from '../../../utils';
import { createProcessMainFile } from '../main';

interface DateEventMain {
  date: string;
  title: string;
  exact_date: string;
  description: string;
  image: string;
  link: string;
}

export const createProcessChangedDates = (
  dependencies: Dependencies,
  errors: string[],
) => {
  const { postgres } = dependencies;

  return async (resource: ChangedResource) => {
    return postgres
      .begin(async (transaction) => {
        const { main } = separateContentFiles(resource, 'dates.yml');

        try {
          const processMainFile = createProcessMainFile(transaction);
          await processMainFile(resource, main);
        } catch (error) {
          errors.push(`Error processing file ${resource.path}: ${error}`);
          return;
        }

        // Continúa solo si main no es null y no es de tipo 'removed'
        if (main && main.kind !== 'removed') {
          const parsed = yamlToObject<DateEventMain>(main.data);

          // Obtiene el ID del recurso insertado o actualizado
          const resourceResult = await transaction<Resource[]>`
            SELECT id FROM content.resources WHERE path = ${resource.path}
          `.then(firstRow);

          if (!resourceResult) {
            errors.push(`Resource not found for path ${resource.path}`);
            return;
          }

          // Inserta o actualiza el evento de fecha clave
          try {
            console.log('Image URL:', parsed.image);
            console.log('Link URL:', parsed.link);

            await transaction`
    INSERT INTO content.date_events (
      resource_id, date, title, exact_date, description, image_url, link_url
    )
    VALUES (
      ${resourceResult.id},
      ${parsed.date},
      ${parsed.title},
      ${parsed.exact_date},
      ${parsed.description},
      ${parsed.image},
      ${parsed.link}
    )  
    ON CONFLICT (resource_id) DO UPDATE SET
      date = EXCLUDED.date,
      title = EXCLUDED.title,
      exact_date = EXCLUDED.exact_date,
      description = EXCLUDED.description,
      image_url = EXCLUDED.image_url,
      link_url = EXCLUDED.link_url
  `;
          } catch (error) {
            errors.push(
              `Error processing date event 1 for ${resource.path}: ${error}`,
            );
          }
        }
      })
      .catch((error) => {
        errors.push(`Transaction error for ${resource.path}: ${error}`);
      });
  };
};
