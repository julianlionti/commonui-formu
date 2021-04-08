import { createLangCtx } from 'use-lang'

export interface LangProps {
  dialog: {
    accept: string
    cancel: string
  }
}

export const { LangProvider, useLang } = createLangCtx<LangProps>()
