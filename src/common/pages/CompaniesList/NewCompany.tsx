import React, { ReactElement } from 'react'
import compose from 'recompose/compose'
import { inject, observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import {
  createStyles,
  Table,
  Checkbox,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Typography,
  withStyles,
  Button,
  IconButton,
  TextField,
  WithStyles,
  Drawer,
} from '@material-ui/core'
import S from 'constants/style'
import cn from 'classnames'
import { StoreInject } from 'types'
import CloseIcon from '@material-ui/icons/Close'
import Card from 'common/components/Card/Card'

const userList = [
  {
    name: 'Дмитрий Володин',
    email: 'volodin@yandex.ru',
    role: 'Бухгалтер',
  },
  {
    name: 'Сергей Турбинов',
    email: 'turbinov@yandex.ru',
    role: 'Администратор',
  },
  {
    name: 'Алексей Смирнов',
    email: 'smirnov@yandex.ru',
    role: 'Бухгалтер',
  },
]

const templates = [
  {
    name: 'Личные данные',
    title: 'Уважаемый {{user.name}}...'
  },
  {
    name: 'Опрос о работе',
    title: 'Уважаемый {{user.name}}...'
  },
  {
    name: 'Корпоративные данные',
    title: 'Уважаемый {{user.name}}...'
  }
]

const pages = [
  {
    name: 'Личные данные',
  },
  {
    name: 'Опрос о работе',
  },
  {
    name: 'Корпоративные данные',
  }
]

type Stage = {template: string, page: string}

type OuterProps = {
  opened: boolean
  closeSidebar: () => void
}

type State = {
  name: string
  userList: string[]
  stageList: {
    [key: string]: Stage
  }
}

type InnerProps = WithStyles<typeof styles> & StoreInject & OuterProps

class NewCompany extends React.Component<InnerProps, State> {
  state: State = {
    userList: [],
    name: '',
    stageList: {}
  }

  private stageCount = 0

  addStage = () => {
    this.setState({ stageList: {...this.state.stageList, [this.stageCount]: {
      template: '',
      page: ''
    }} 
  })
    this.stageCount++
  }

  handleChangeName = (e: any) => this.setState({ name: e.target.value })

  handleTemplate = (id: string) => (e: any) => {
    this.setState({stageList: {
      ...this.state.stageList,
      [id]: {
        ...this.state.stageList[id],
        template: e.target.value
      }
    }})
  }

  handlePage = (id: string) => (e: any) => {
    this.setState({stageList: {
      ...this.state.stageList,
      [id]: {
        ...this.state.stageList[id],
        page: e.target.value
      }
    }})
  }

  handleChangeUsers = (e: any) =>
    this.setState({ userList: this.state.userList.includes(e.target.value) ? this.state.userList.filter((item) => item !== e.target.value) : [...(this.state.userList), e.target.value] })

  renderStage = (stage: Stage, id: string) => {
    const { classes: c } = this.props

    return (
      <div className={c.stage}>
        <Typography variant="h5">{`Письмо ${+id + 1}`}</Typography>
        <div className={c.row}>
          <Typography variant="subtitle1">Выбрать шаблон</Typography>
          <div className={c.cards}>
            {templates.map((template) => (<Card value={template.name} title={template.name} text={template.title} checked={stage.template === template.name} onClick={this.handleTemplate(id)}/>))}
          </div>
        </div>
        <div className={c.row}>
          <Typography variant="subtitle1">Выбрать страницу</Typography>
          <div className={c.cards}>
            {pages.map((template) => (<Card value={template.name} title={template.name} text={''} checked={stage.page === template.name} onClick={this.handlePage(id)}/>))}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { classes: c, opened, closeSidebar } = this.props

    return (
      <Drawer
        classes={{
          paper: c.drawerPaper,
          root: c.drawer
        }}
        onClose={this.props.closeSidebar}
        variant={'temporary'}
        anchor='right'
        open={opened}
      >
        <div className={c.root}>
          <div className={c.header}>
            <Typography variant="h4">Создать кампанию</Typography>
            <IconButton onClick={closeSidebar}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={c.container}>
            <TextField required onChange={this.handleChangeName} label="Название кампании" placeholder="Фишинговая кампания" />
            <TableContainer className={c.row} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Добавленные</TableCell>
                    <TableCell>Имя</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Роль</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((user) => (
                    <TableRow key={user.name}>
                      <TableCell>
                        <Checkbox checked={this.state.userList.includes(user.email)} color="primary" onChange={this.handleChangeUsers} value={user.email}></Checkbox>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {Object.entries(this.state.stageList).map(([id, stage]) => this.renderStage(stage, id))}

            <div className={c.row}>
                <Button color='primary' onClick={this.addStage}>Добавить этап</Button>
            </div>

            <Button className={c.addButton} color='primary' size='large' onClick={closeSidebar}>Добавить кампанию</Button>
          </div>
        </div>
      </Drawer>
    )
  }
}

const styles = createStyles({
  drawer: {
    height: 'calc(100vh - 24px)',
  },

  row: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  stage: {
    borderBottom: 'thin gray solid',
    width: '100%',
    marginTop: 30
  },

  cards: {
    width: '100%',
    marginLeft: '-20px',
    marginRight: '-20px',
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    color: S.white,
    marginLeft: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addButton: {
    marginBottom: 20
  },
  drawerPaper: {
    zIndex: 20,
    whiteSpace: 'nowrap',
    height: '100%',
    width: 600,
    flex: '0 0 auto',
    borderRadius: '20px 0 0 0',
    // background: S.lightRed,
    boxShadow: '6px 0px 5px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%)',
    padding: 12,
    paddingBottom: 0,
    // transform: 'translateX(0px)',
    transition: 'all .25s ease-out',
  },
})

export default compose<InnerProps, OuterProps>(withStyles(styles, { name: 'NewCompany' }), inject('store'), observer)(NewCompany)
