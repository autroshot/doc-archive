import IdealImage from '@theme/IdealImage';
import React from 'react';

export default function MyImage({ img, alt, maxWidth }) {
  return <IdealImage img={img} alt={alt} style={{ maxWidth }} />;
}
