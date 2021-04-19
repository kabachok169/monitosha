import React from 'react'
import theme from '../../../config/theme'
import { ThemeProvider, StylesProvider, createStyles, withStyles } from '@material-ui/core/styles'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import TemplateCreate from '../TemplateCreate'
import { compose } from 'recompose'
import SendMessage from '../SendMessage'
import SideBar from 'common/components/Layout/Sidebar'
import Page from 'common/components/Layout/Page'
import { WithPartialClasses, WithClasses } from 'lib/jss'
import { inject, observer } from 'mobx-react'
import { StoreInject } from 'types'
import CompaniesList from '../CompaniesList'

const Routes = [
  { to: '/user-list', component: SendMessage },
  { to: '/template-create', component: TemplateCreate },
  { to: '/companies-list', component: CompaniesList },
  { to: '/companie-create', component: SendMessage },
  { to: '/templates-list', component: SendMessage },
]

type OuterProps = WithPartialClasses<typeof styles>

type InnerProps = WithClasses<typeof styles> & StoreInject & OuterProps

class App extends React.Component<InnerProps> {
  render() {
    const { classes: c } = this.props

    return (
      <StylesProvider>
        <ThemeProvider theme={theme}>
          <div className={c.root}>
            <SideBar />
            <Page>
              <Switch>
                {Routes.map((item, i) => (
                  <Route key={i} path={item.to} component={item.component} />
                ))}
                <Route path='*' component={() => <Redirect to='/companies-list' />} />
              </Switch>
            </Page>
          </div>
        </ThemeProvider>
      </StylesProvider>
    )
  }
}

const styles = createStyles({
  '@global': {
    'body': {
      margin: 0
    }
  },
  root: {
    display: 'flex',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
})

export default compose<InnerProps, OuterProps>(withRouter, withStyles(styles, { name: 'App' }), inject('store'), observer)(App)
