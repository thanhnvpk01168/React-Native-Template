/**
 * Example
 * <SvgIcon source={SvgComponent.icon_name} color='red' size={155} />
*/
import React, { createElement, memo } from 'react';
import isEqual from 'react-fast-compare';
import { SvgIconProps } from './type';


const SvgIconComponent = ({
  source,
  color = '#000',
  size = 24,
}: SvgIconProps) => {
  return (
    <>
      {createElement(source, {
        width: size,
        height: size,
        fill: color,
      })}
    </>
  );
};

export const SvgIcon = memo(SvgIconComponent, isEqual);
