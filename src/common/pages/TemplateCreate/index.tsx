import React from 'react'
import { WithClasses, WithPartialClasses } from 'lib/jss'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { StoreInject } from 'types'
import { Button, createStyles, TextField, Typography, withStyles } from '@material-ui/core'

type OuterProps = WithPartialClasses<typeof styles>

type InnerProps = WithClasses<typeof styles> & StoreInject & OuterProps

class TemplateCreate extends React.Component<InnerProps> {
  render() {
    const {
      classes: c,
      store: { example },
    } = this.props

    return (
      <div className={c.root}>
        <Typography variant={'body1'} className={c.back}>На главную</Typography>
        <Typography variant={'h1'} className={c.title}>Создать шаблон</Typography>
        <div className={c.inputGroup}>
          <TextField
            label="Название шаблона"
            className={c.templateName}
            variant="outlined"
          />
          <TextField
            label="Текст шаблона"
            className={c.input}
            multiline
            rows={12}
            variant="outlined"
          />
        </div>
        <div className={c.buttonGroup}>
          <Button color="primary" variant="contained">Сохранить</Button>
        </div>
      </div>
    )
  }
}

const styles = createStyles({
  root: {
    width: '100%',
    paddingLeft: 100
  },

  back: {
    height: 32,
    margin: 0,
    paddingTop: 20
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },

  templateName: {
    marginTop: 32,
    width: 700
  },

  input:  {
    marginTop: 20,
    width: 700
  },

  buttonGroup: {
    marginTop: 32
  },

  title: {
    fontSize: '32px',
  },
})

export default compose<InnerProps, OuterProps>(withStyles(styles, {name: 'TemplateCreate'}), inject('store'), observer)(TemplateCreate)
