import {applySnapshot, flow, Instance, types} from 'mobx-state-tree'

const Statuses = types.enumeration('Statuses', ['paused', 'in_progress', 'complete'])

export type StatusesType = Instance<typeof Statuses>

const Company = types.model()
  .named('Company')
  .props({
    status: Statuses,
    count: types.number,
    name: types.string
  })
  .views((self) => ({
    get isLoggedIn() {
      return true
    }
  }))
  .actions((self) => {
    const actions = {
      
    }

    return actions
  })

export default Company

export type CompanyType = Instance<typeof Company>
