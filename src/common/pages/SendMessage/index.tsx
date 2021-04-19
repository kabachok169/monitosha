import React from 'react'
import { WithClasses, WithPartialClasses } from 'lib/jss'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { StoreInject } from 'types'
import { Button, createStyles, Typography, withStyles } from '@material-ui/core'
import Card from '../../components/Card/Card'

type OuterProps = WithPartialClasses<typeof styles>

type InnerProps = WithClasses<typeof styles> & StoreInject & OuterProps

class SendMessage extends React.Component<InnerProps> {
  render() {
    const {
      classes: c,
      store: { example },
    } = this.props

    return (
      <div className={c.root}>
        <Typography variant={'h2'} className={c.title}>Выберите шаблон</Typography>
        <div className={c.templates}>
          <Card title="Успехи сотрудников" text="Здравствуйте, уважаемый..."/>
        </div>
        <Typography variant={'h2'} className={c.title}>Выберите сотрудников</Typography>
        <div className={c.employees}>
          <Card title="Дмитриев Антон Игоревич" text=""/>
          <Card title="Тучин Даниил Андреевич" text=""/>
        </div>

        <div className={c.buttonGroup}>
          <Button color="primary" variant="contained">Отправить</Button>
        </div>
      </div>
    )
  }
}

const styles = createStyles({
  root: {
    width: '100%',
  },

  templates: {
    display: 'flex',
    width: '100%',
    marginLeft: 38,
  },

  employees: {
    display: 'flex',
    width: '100%',
    marginLeft: 38,
  },

  buttonGroup: {
    marginLeft: 50,
    marginTop: 32
  },

  title: {
    marginTop: 32,
    marginLeft: 50,
    fontSize: '32px',
  },
})

export default compose<InnerProps, OuterProps>(withStyles(styles, {name: 'SendMessage'}), inject('store'), observer)(SendMessage)
