import React from 'react';

export default function ElectronFiddleButton({ href }) {
  return (
    <a
      class="button button--primary"
      style={{
        textDecoration: 'none',
        color: 'white',
      }}
      href={href ?? '#'}
      target="_blank"
    >
      피들에서 열기
    </a>
  );
}
