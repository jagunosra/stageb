import type { CollectionConfig } from 'payload/types'

import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidatePage } from './hooks/revalidatePage'
import { delPageAccess, getPageAccess, postPageAccess } from './access/pageAccess'

export const Pages: CollectionConfig = {
  slug: 'pages',
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    // More options are available
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePage],
    afterRead: [populateArchiveBlock],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: getPageAccess,
    update: postPageAccess,
    create: postPageAccess,
    delete: delPageAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'richText',
    },
    slugField(),
  ],
}
