import { sql } from '@sovereign-university/database';
import { DateEvent } from '@sovereign-university/types';

export const getDateEventQuery = (id: number) => {
  return sql<DateEvent[]>`
    SELECT 
      de.resource_id, de.date, de.title, de.exact_date, de.description, 
      de.image_url, de.link_url, r.path, r.last_updated, r.last_commit
    FROM content.date_events de
    JOIN content.resources r ON r.id = de.resource_id
    WHERE de.resource_id = ${id}
    GROUP BY de.resource_id, de.date, de.title, de.exact_date, de.description, 
    de.image_url, de.link_url, r.path, r.last_updated, r.last_commit
  `;
};
