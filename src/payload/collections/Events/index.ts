import type { CollectionConfig } from 'payload/types'
import { delEventAccess, getEventAccess, postEventAccess } from './access/eventAccess'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: getEventAccess,
    create: postEventAccess,
    update: postEventAccess,
    delete: delEventAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    {
      name: 'eventLocation',
      type: 'text',
      required: true,
    },
  ],
}
