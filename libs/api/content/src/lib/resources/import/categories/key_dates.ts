import { firstRow } from '@sovereign-university/database';
import { Resource } from '@sovereign-university/types';

import { ChangedResource } from '..';
import { Dependencies } from '../../../dependencies';
import { separateContentFiles, yamlToObject } from '../../../utils';

interface DateEvent {
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
          if (main && main.kind !== 'removed') {
            const parsed = yamlToObject<DateEvent>(main.data);
            const fullPath = `${resource.path}/dates.yml`;

            const id = await transaction<Resource[]>`
              SELECT id FROM content.resources WHERE path = ${fullPath}
            `
              .then(firstRow)
              .then((row) => row?.id);

            if (!id) {
              throw new Error(`Resource not found for path ${fullPath}`);
            }

            await transaction`
            INSERT INTO content.date_events (
              resource_id, date, title, exact_date, description, image_url, link_url
            )
            VALUES (
              ${id}, ${parsed.date}, ${parsed.title}, ${parsed.exact_date},
              ${parsed.description}, ${parsed.image}, ${parsed.link}
            )
            ON CONFLICT (resource_id) DO UPDATE SET
              date = EXCLUDED.date,
              title = EXCLUDED.title,
              exact_date = EXCLUDED.exact_date,
              description = EXCLUDED.description,
              image_url = EXCLUDED.image,
              link_url = EXCLUDED.link
          `;
          }
        } catch (error) {
          errors.push(`Error processing file ${main?.path}: ${error}`);
        }
      })
      .catch(() => {
        return;
      });
  };
};
