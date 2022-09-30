import { Text as TextRN } from 'react-native'
import React, { memo } from 'react'
import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { TextProps } from './type';

function TextTranslateComponent({
  children,
  style = {},
  ...rest
}: TextProps) {

  const { t } = useTranslation();

  return (
    <TextRN
      {...rest}
      style={
        Array.isArray(style)
          ? [{ color: 'black' }, ...style]
          : [{ color: 'black' }, style]
      }>

      {t(children)}

    </TextRN>
  )
}

export const TextTranslate = memo(TextTranslateComponent, equals);

// const { i18n } = useTranslation();
// change language-> i18n.changeLanguage( en | fr | jp );