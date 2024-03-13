
import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['owner', 'staff'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'group',
      name: 'permissions',
      label: 'Permissions',
      access: {
        create: admins,
        read: admins,
        update: admins,
      },
      fields: [
        {
          label: 'Pages',
          type: 'collapsible',
          fields: [
            {
              name: 'getPages',
              label: 'Read',
              type: 'checkbox',
            },
            {
              name: 'createUpdatePages',
              label: 'Create and edit',
              type: 'checkbox',
            },
            {
              name: 'deletePages',
              label: 'Delete',
              type: 'checkbox',
            },
          ],
        },
        {
          label: 'Events',
          type: 'collapsible',
          fields: [
            {
              name: 'getEvents',
              label: 'Read',
              type: 'checkbox',
            },
            {
              name: 'createUpdateEvents',
              label: 'Create and edit',
              type: 'checkbox',
            },
            {
              name: 'deleteEvents',
              label: 'Delete',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['staff'],
      options: [
        {
          label: 'Owner',
          value: 'owner',
        },
        {
          label: 'Staff',
          value: 'staff',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: ({ req: { user } }) => checkRole(['owner'], user),
      },
    },
  ],
  timestamps: true,
}

export default Users
