import { types, Instance, applySnapshot } from 'mobx-state-tree'
import Example from './models/Example'

const Store = types
  .model('Store', {
    example: types.optional(Example, {}),
  })
  .actions((self) => ({
    resetStore() {
      applySnapshot(self, {
        example: {},
      })
    },
  }))

export default Store

export type StoreType = Instance<typeof Store>
