import { withStyles as MUIWithStyles, Styles as MUIStyles } from '@material-ui/styles'

export type RuleNames<T> = {
  [K in keyof T]: T[K] extends object ? K : never
}[keyof T]

type Classes<T> = Record<RuleNames<T>, string>

export type WithClasses<T> = {
  classes: Classes<T>
}

export type WithPartialClasses<T> = {
  classes?: Partial<Classes<T>>
  className?: string
}

export const withStyles = (styles: MUIStyles<any, any>, name: string) => MUIWithStyles(styles, { name })
