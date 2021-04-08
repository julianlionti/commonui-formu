import React, { forwardRef, memo, useCallback } from 'react'
import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  LinearProgress,
  makeStyles,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { useLang } from '../translate/Lang'

export interface Props {
  show: boolean
  content: string | JSX.Element
  title: string
  onClose: (wasAccepted: boolean) => void
  loading?: boolean
}

export const Transition = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  ),
)

export const Dialog = memo(({ show, onClose, title, content, loading }: Props) => {
  const { t } = useLang()
  const clases = useClases()

  const renderContent = useCallback(() => {
    if (!content) return null

    if (typeof content === 'string')
      return content.split('\n').map((e) => <DialogContentText key={e}>{e}</DialogContentText>)

    return content
  }, [content])

  return (
    <MuiDialog open={show} TransitionComponent={Transition}>
      {loading && <LinearProgress />}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={clases.contenido}>{renderContent()}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          {t.dialog.cancel}
        </Button>
        <Button onClick={() => onClose(true)} color="primary" autoFocus>
          {t.dialog.accept}
        </Button>
      </DialogActions>
    </MuiDialog>
  )
})

const useClases = makeStyles((tema) => ({
  contenido: {
    boxShadow: tema.shadows[1],
  },
}))
