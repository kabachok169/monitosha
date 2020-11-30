import React from 'react'
import { WithClasses, withStyles, WithPartialClasses } from 'lib/jss'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { StoreInject } from 'types'
import { Button, createStyles } from '@material-ui/core'

type OuterProps = WithPartialClasses<typeof styles>

type InnerProps = WithClasses<typeof styles> & StoreInject & OuterProps

class Example extends React.Component<InnerProps> {
  render() {
    const {
      classes: c,
      store: { example },
    } = this.props

    
    return (
      <div className={c.root}>
        <Button color="primary" variant="contained">
          {example.text}
        </Button>
      </div>
    )
  }
}

const styles = createStyles({
  root: {
    width: '100%',
  },

  title: {
    fontSize: '32px',
  }
})

export default compose<InnerProps, OuterProps>(withStyles(styles, 'Example'), inject('store'), observer)(Example)
