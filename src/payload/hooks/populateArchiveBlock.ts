import type { AfterReadHook } from 'payload/dist/collections/config/types'

export const populateArchiveBlock: AfterReadHook = async ({ doc }) => {
  // pre-populate the archive block if `populateBy` is `collection`
  // then hydrate it on your front-end
  return {
    ...doc,
  }
}
