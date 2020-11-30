import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import moment from 'moment'
import Store, { StoreType } from 'Store'
import { BrowserRouter } from 'react-router-dom'
import App from 'common/pages/App'
moment.locale('ru')

import 'core-js/stable'
import 'regenerator-runtime/runtime'

const initApp = async () => {
  const env = {}

  const store: StoreType = Store.create({}, env)

  ReactDOM.render(
    <Provider store={store} env={env}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  )
}

void initApp()
