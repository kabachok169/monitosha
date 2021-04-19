import React from 'react'
import { WithClasses, WithPartialClasses } from 'lib/jss'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { StoreInject } from 'types'
import { createStyles, Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, Typography, withStyles, Button, IconButton } from '@material-ui/core'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import NewCompany from './NewCompany'

type Company = {
  name: string,
  count: number,
  status: 'complete' | 'in_progress' | 'paused',
  successCount: number,
  errorCount: number
}

const rows: Company[] = [
  {
    name: 'Кампания для администраторов',
    count: 20,
    status: 'complete',
    successCount:  8,
    errorCount: 12
  },
  {
    name: 'Кампания для бухгалтеров',
    count: 12,
    status: 'complete',
    successCount:  8,
    errorCount: 4
  },
  {
    name: 'Кампания для администраторов 2',
    count: 20,
    status: 'in_progress',
    successCount:  5,
    errorCount: 1
  },
  {
    name: 'Кампания для бухгалтеров 2',
    count: 12,
    status: 'paused',
    successCount:  0,
    errorCount: 0
  },
]

const statusMap: {[key in Company['status']]: string} = {
  paused: 'Не началась',
  in_progress: 'Проводится',
  complete: 'Завершена'
}

type OuterProps = WithPartialClasses<typeof styles> & {
  
}

type InnerProps = WithClasses<typeof styles> & StoreInject & OuterProps

type State = {
  sidebarOpened: boolean
}

class CompaniesList extends React.Component<InnerProps, State> {
  state: State = {
    sidebarOpened: false
  }

  openSidebar = () => this.setState({sidebarOpened: true})
  closeSidebar = () => this.setState({sidebarOpened: false})

  render() {
    const {
      classes: c,
    } = this.props

    return (
      <div className={c.root}>
        <NewCompany opened={this.state.sidebarOpened} closeSidebar={this.closeSidebar}/>

        <div className={c.header}>
          <Typography className={c.headerItem} variant='h4'>Список фишинговых кампаний</Typography>
          <IconButton className={c.headerItem} onClick={this.openSidebar}><AddCircleOutlinedIcon color='secondary' fontSize='large'/></IconButton>
        </div>
        
        <div className={c.companies}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Количество сотрудников</TableCell>
                  <TableCell>Успешные</TableCell>
                  <TableCell>Провальные</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.successCount}</TableCell>
                    <TableCell>{row.errorCount}</TableCell>
                    <TableCell>{statusMap[row.status]}</TableCell>
                    <TableCell>{<Button className={c.actionButton} color={row.status === 'paused' ? 'primary' : 'secondary'} variant="contained">{row.status === 'paused' ? 'Начать' : 'Открыть'}</Button>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}

const styles = createStyles({
  root: {
    width: '100%'
  },
  companies: {
    width: '100%',
    marginTop: 20
  },
  actionButton: {
    width: 120
  },
  header: {
    display: 'flex'
  },
  headerItem: {
    alignSelf: 'center',
    marginRight: 10
  }
})

export default compose<InnerProps, OuterProps>(withStyles(styles, {name: 'CompaniesList'}), inject('store'), observer)(CompaniesList)
