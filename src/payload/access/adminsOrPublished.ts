import type { Access } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'

export const adminsOrPublished: Access = ({ req }) => {
  const test = actualFunc({ req })
  console.log(test)
  return test
}

const actualFunc: Access = ({ req: { user } }) => {
  if (!user) {
    console.log('no USer')
  }
  return {
    _status: {
      equals: 'published',
    },
  }
}
