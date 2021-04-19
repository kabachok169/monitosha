import React, { ReactElement } from 'react'
import compose from 'recompose/compose'
import { inject, observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import { Drawer, Link, List, Typography, WithStyles } from '@material-ui/core'
import S from 'constants/style'
import cn from 'classnames'
import { StoreInject } from 'types'
import { createStyles, withStyles } from '@material-ui/core/styles'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DashboardIcon from '@material-ui/icons/Dashboard'


type Link = {
  path: string
  name: string
  visible: boolean
  mark?: React.ReactNode
  icon: any
}

type InnerProps = WithStyles<typeof styles> & StoreInject

class Sidebar extends React.Component<InnerProps> {
  get headerLink(): Link[] {
    return [
      {
        path: '/companies-list',
        name: 'Кампании',
        visible: true,
        icon: DashboardIcon
      },
      {
        path: '/templates-list',
        name: 'Шаблоны',
        visible: true,
        icon: AssignmentIcon
      },
      {
        path: '/user-list',
        name: 'Пользователи',
        visible: true,
        icon: AssignmentIndIcon
      }
    ]
  }

  renderLink = (link: Link, index: number, isMobile?: boolean) => {
    if (!link.visible) {
      return null
    }

    const { classes: c } = this.props

    if (!link.visible) {
      return null
    }

    return (
      <NavLink className={c.nav} to={link.path} key={index}>
        <link.icon className={c.navItem}/>
        <div className={c.navItem}>{link.name}</div>
      </NavLink>
    )
  }

  render() {
    const { classes: c } = this.props

    return (
      <Drawer
        classes={{
          paper: c.drawerPaper,
          root: c.drawer,
        }}
        variant={'permanent'}
        anchor="left"
        open
      >
        <div className={c.container}>
          <Typography variant="h4" className={c.title}>
            Monitosha
          </Typography>
          <List className={c.navList}>{this.headerLink.map((link, index) => this.renderLink(link, index, false))}</List>
        </div>
      </Drawer>
    )
  }
}

const styles = createStyles({
  drawer: {
    height: 'calc(100vh - 24px)',
  },
  title: {
    color: S.white,
    marginLeft: 10,
    marginTop: 12
  },
  navList: {
    marginTop: 20,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
    position: 'relative'
  },

  logo: {
    fontSize: 20,
    lineHeight: '24px',
    color: 'white',
  },
  navItem: {
    alignSelf: 'center',
    '&:first-of-type': {
      marginRight: 8
    }
  },
  nav: {
    position: 'relative',
    display: 'flex',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    transition: S.transition,
    textDecoration: 'none',
    borderRadius: 12,
    padding: '18px 10px',
    marginBottom: 3,
    '&:last-child': {
      marginBottom: 0,
    },
    '&:hover': {
      color: 'white',
      background: S.mediunRed,
    },
    '&.active': {
      background: S.darkRed,
      color: 'white',
    },
  },
  drawerPaper: {
    zIndex: 20,
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100%',
    width: 240,
    flex: '0 0 auto',
    background: S.lightRed,
    boxShadow: '6px 0px 5px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%)',
    borderRadius: '0px 20px 0px 0px',
    padding: 12,
    border: 'none',
    transform: 'translateX(0px)',
    transition: 'all .25s ease-out',
  },
})

export default compose<InnerProps, {}>(withStyles(styles, { name: 'NewSidebar' }), inject('store'), observer)(Sidebar)
