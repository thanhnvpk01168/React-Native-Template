import React from 'react';
import {
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

export interface TextProps extends TextProperties {
  /**
   * Children of text
   * @default undefined
   */
  children?: string;
  /**
   * Overwrite style of text component
   * @default undefined
   */
  style?: StyleProp<TextStyle>;
}