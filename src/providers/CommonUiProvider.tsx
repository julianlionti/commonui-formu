import React from 'react'

import { ProviderPros as LangProviderProps } from 'use-lang'

import { enUs } from '../translate/enUs'
import { esAr } from '../translate/esAr'
import { LangProps, LangProvider } from '../translate/Lang'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CommonUiProvider = ({
  lang,
  onLang,
  children,
  translations,
}: Partial<LangProviderProps<LangProps>>): JSX.Element => {
  return (
    <LangProvider
      lang={lang || 'es'}
      onLang={onLang}
      translations={{ es: translations?.es || esAr, en: translations?.en || enUs }}>
      {children}
    </LangProvider>
  )
}
