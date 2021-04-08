import React, { useState } from 'react'
import { LoadingBtn, TooltipIconButton, Dialog } from 'commonui-formu'
import { ReactComponent as PDF } from '../assets/pdf.svg'

const Example = () => {
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  return (
    <div
      style={{
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}>
      <p>LoadingBtn:</p>
      <LoadingBtn
        onClick={async () => {
          setLoading(true)
          await new Promise((res) => setTimeout(res, 1500))
          setLoading(false)
        }}
        loading={loading}>
        <span>Enviar</span>
      </LoadingBtn>
      <p>TooltipIconButton - Dialog:</p>
      <TooltipIconButton title="Descargar archivo" onClick={() => setShowDialog(true)}>
        <PDF width={30} height={30} />
      </TooltipIconButton>
      <Dialog
        title="Prueba Cartel"
        content={() => <p>Con custom component</p>}
        show={showDialog}
        onClose={(wasAccepted) => {
          setShowDialog(false)
          alert(wasAccepted)
        }}
      />
    </div>
  )
}

export default Example
