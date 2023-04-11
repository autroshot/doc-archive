import React from 'react';

export default function CodeSandbox({ title, modulePath }) {
  return (
    <iframe
      src={createSrc()}
      style={{
        width: '100%',
        height: '500px',
        border: '0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title={title}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );

  function createSrc() {
    let moduleQueryString = '';
    if (modulePath) {
      const convertedModulePath = modulePath.replace(/\//g, '%2F');
      moduleQueryString = `&module=${convertedModulePath}`;
    }

    return `https://codesandbox.io/embed/${title}?codemirror=1&fontsize=14&hidenavigation=1&view=editor${moduleQueryString}`;
  }
}
