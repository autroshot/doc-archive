// @ts-ignore
import IdealImage from '@theme/IdealImage';
import React from 'react';

export default function Image({ img, alt, maxWidth }) {
  return <IdealImage img={img} alt={alt} style={{ maxWidth }} />;
}
