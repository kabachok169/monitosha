import React from 'react'
import { WithClasses, WithPartialClasses } from 'lib/jss'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { StoreInject } from 'types'
import { Button, createStyles, withStyles } from '@material-ui/core'

type OuterProps = WithPartialClasses<typeof styles> & {
  children: React.ReactElement<any> | JSX.Element[]
}

type InnerProps = WithClasses<typeof styles> & StoreInject & OuterProps

class Page extends React.Component<InnerProps> {
  render() {
    const {
      classes: c,
      children,
    } = this.props

    return (
      <div className={c.root}>
        {children}
      </div>
    )
  }
}

const styles = createStyles({
  root: {
    width: 'calc(100vw - 240px)',
    padding: '20px 30px',
    paddingRight: 400
  }
})

export default compose<InnerProps, OuterProps>(withStyles(styles, {name: 'Page'}), inject('store'), observer)(Page)
