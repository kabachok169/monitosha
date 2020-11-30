import { types, Instance } from 'mobx-state-tree'

const Example = types.model('Example', {
  text: types.optional(types.string, 'HELLO'),
})

export default Example
export type ExampleType = Instance<typeof Example>
