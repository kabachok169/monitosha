import { Card, CardActions, CardContent, createStyles, Typography, withStyles, Checkbox } from "@material-ui/core"
import S from "constants/style"
import { WithClasses, WithPartialClasses } from "lib/jss"
import { inject, observer } from "mobx-react"
import React from "react"
import { compose } from "recompose"
import { StoreInject } from "types"

type InnerProps = OuterProps & WithClasses<typeof styles> & StoreInject

type OuterProps = {
  title: string
  text: string
  checked: boolean,
  onClick: (e: any) => void,
  value: any
} & WithPartialClasses<typeof styles>

class PlaceCard extends React.Component<InnerProps> {
  render() {
    const {classes: c, title, text, checked, onClick, value} = this.props

    return (
      <Card className={c.root}>
        <CardContent className={c.content}>
          <Typography className={c.name} color='initial'>
            {title}
          </Typography>
          <Typography className={c.address} color='initial'>
            {text}
          </Typography>
        </CardContent>
        <CardActions classes={{root: c.actions}}>
          <Checkbox value={value} onClick={onClick} checked={checked} color={'primary'}></Checkbox>
        </CardActions>
      </Card>
    )
  }
}

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // width: 220,
    padding: '14px 16px',
    margin: '12px 20px',
    borderRadius: 12,
    boxShadow: 'none',
    cursor: 'pointer',
    border: "black 1px solid"
  },
  content: {
    position: 'relative', // для .arrow, что бы absolut'ом не выкидывало за content
    padding: 0,
    marginBottom: 10
  },
  texts: {
    color: '#1F2021'
  },
  name: {
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: 'bold',
    marginBottom: 4
  },
  address: {
    fontSize: 14,
    lineHeight: '18px',
    marginBottom: 4,
    fontWeight: 'normal'
  },
  disabledText: {
    fontSize: 14,
    lineHeight: '18px'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0
  },
  [S.mobileQuery]: {
    root: {
      width: '100%'
    }
  }
})
export default compose<InnerProps, OuterProps>(withStyles(styles, {name: 'PlaceCard'}), inject('store'), observer)(PlaceCard)

