import { AccessArgs } from 'payload/config'
import { User } from '../../../payload-types'

type pageAccessFunc = (args: AccessArgs<unknown, User>) => boolean

export const getPageAccess: pageAccessFunc = ({ req: { user } }) => {
  if (user?.permissions?.getPages !== undefined && user?.permissions?.getPages !== null) {
    return user.permissions.getPages
  }
  return false
}

export const postPageAccess: pageAccessFunc = ({ req: { user } }) => {
  if (user?.permissions?.createUpdatePages !== undefined && user?.permissions?.createUpdatePages !== null) {
    return user.permissions.createUpdatePages
  }
  return false
}

export const delPageAccess: pageAccessFunc = ({ req: { user } }) => {
  if (user?.permissions?.deletePages !== undefined && user?.permissions?.deletePages !== null) {
    return user.permissions.deletePages
  }
  return false
}
