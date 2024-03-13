import { AccessArgs } from 'payload/config'
import { User } from '../../../payload-types'

type eventAccessFunc = (args: AccessArgs<unknown, User>) => boolean

export const getEventAccess: eventAccessFunc = ({ req: { user } }) => {
  if (user) {
    return user.permissions.getEvents
  }
  return false
}

export const postEventAccess: eventAccessFunc = ({ req: { user } }) => {
  if (user) {
    return user.permissions.createUpdateEvents
  }
  return false
}

export const delEventAccess: eventAccessFunc = ({ req: { user } }) => {
  if (user) {
    return user.permissions.deleteEvents
  }
  return false
}
