import React from 'react';

export default function ElectronFiddleButton({ href }) {
  return (
    <a
      className="button button--primary"
      style={{
        textDecoration: 'none',
        color: 'white',
        marginTop: '10px',
        marginBottom: '10px',
      }}
      href={href ?? '#'}
      target="_blank"
    >
      피들에서 열기
    </a>
  );
}
