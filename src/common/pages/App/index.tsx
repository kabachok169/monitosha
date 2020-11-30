import React from 'react'
import theme from '../../../config/theme'
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { Switch, Route, withRouter } from 'react-router-dom'
import Example from '../Example'
import { compose } from 'recompose'

class App extends React.Component {
  render() {
    return (
      <StylesProvider>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route to="/" component={Example} />
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    )
  }
}

export default compose<{}, {}>(withRouter)(App)
