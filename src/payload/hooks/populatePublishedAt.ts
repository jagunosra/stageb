import type { BeforeChangeHook } from 'payload/dist/collections/config/types'

export const populatePublishedAt: BeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.body && !req.body.published) {
      return {
        ...data,
        published: true,
      }
    }
  }

  return data
}
