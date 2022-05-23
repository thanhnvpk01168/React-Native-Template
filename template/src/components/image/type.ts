import {
  StyleProp,
} from 'react-native';
import { FastImageProps as FastImageProperties, ImageStyle } from 'react-native-fast-image';

type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';

export interface FastImageProps extends FastImageProperties {

  resizeMode?: ResizeMode;

  style?: StyleProp<ImageStyle>;
}