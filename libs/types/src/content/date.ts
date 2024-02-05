import type { default as DateEvent } from '../sql/content/DateEvents';

import type { Resource } from '.';

export type { default as DateEvent } from '../sql/content/DateEvents';

export type JoinedDateEvent = Pick<
  Resource,
  'id' | 'path' | 'last_updated' | 'last_commit'
> &
  Pick<
    DateEvent,
    'date' | 'title' | 'exact_date' | 'description' | 'image_url' | 'link_url'
  >;
