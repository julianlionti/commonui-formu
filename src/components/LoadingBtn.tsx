import { Button, CircularProgress, Fade, makeStyles } from '@material-ui/core'
import React from 'React'

type Props = React.PropsWithChildren<{
  size?: 'small' | 'medium'
  loading?: boolean
  onClick: () => void
}>

export const LoadingBtn = ({ size, loading, onClick, children }: Props): JSX.Element => {
  const classes = useClasses()
  return (
    <Button
      classes={{ label: classes.label, endIcon: classes.icons }}
      size={size}
      disabled={loading}
      onClick={onClick}
      type="submit"
      variant="outlined"
      endIcon={
        <Fade in={loading}>
          <CircularProgress size={size === 'small' ? 12 : 16} />
        </Fade>
      }>
      {children}
    </Button>
  )
}

const useClasses = makeStyles((theme) => ({
  label: {
    marginLeft: 22,
  },
  icons: {
    width: theme.spacing(2),
  },
}))
