import {applySnapshot, flow, Instance, types} from 'mobx-state-tree'
import Company from './Company'

const Statuses = types.enumeration('Statuses', ['paused', 'in_progress', 'complete'])

export type StatusesType = Instance<typeof Statuses>

const CompaniesList = types.model()
  .named('Company')
  .props({
    entities: types.optional(types.map(Company), {}),
  })
  .views((self) => ({
    get all() {
      return Array.from(self.entities.values())
    },
  }))
  .actions((self) => {
    const actions = {
      addCompany: (company: CompanyType) => {
        self.entities.put(company)
      }
    }

    return actions
  })

export default Company

export type CompanyType = Instance<typeof Company>
