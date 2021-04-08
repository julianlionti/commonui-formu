import { IconButton, IconButtonProps, Tooltip } from '@material-ui/core'
import React from 'react'

interface Props extends IconButtonProps {
  title: string
}

export const TooltipIconButton = ({ title, onClick, children, ...iconProps }: Props): JSX.Element => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} {...iconProps}>
        {children}
      </IconButton>
    </Tooltip>
  )
}
