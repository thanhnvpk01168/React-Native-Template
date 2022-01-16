/**
 * Example
 * <SvgIcon source={SvgComponent.icon_name} color='red' size={155} />
*/
import React, { createElement, memo } from 'react';
import isEqual from 'react-fast-compare';


const SvgIconComponent = ({ source, color = '#000', size = 24, }) => {
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
