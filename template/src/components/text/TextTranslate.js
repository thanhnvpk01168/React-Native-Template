import { Text as TextRN } from 'react-native'
import React, { memo } from 'react'
import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

function TextTranslateComponent(props) {

  const { t } = useTranslation();

  const {
    children,
    style = {},
    ...rest
  } = props;

  return (
    <TextRN
      allowFontScaling={false}
      {...rest}
      style={{ color: "black", ...style }}>

      {t(children)}

    </TextRN>
  )
}

export const TextTranslate = memo(TextTranslateComponent, equals);

// const { i18n } = useTranslation();
// change language-> i18n.changeLanguage( en | fr | jp );