const visit = require('unist-util-visit');

const plugin = (options) => {
  let targetPaths = [];
  if (typeof options === 'string') {
    targetPaths.push(options);
  }
  if (options && Array.isArray(options)) {
    targetPaths = options;
  }

  return async (ast, vfile) => {
    if (
      targetPaths.length !== 0 &&
      targetPaths.every((targetPath) => !vfile.path.includes(targetPath))
    )
      return;

    visit(ast, 'html', (node) => {
      node.value = node.value.replace(
        /\*\*(\S+?.*?\S+?|\S+?)\*\*/g,
        (_, text) => `<span class="code-inline-highlight">${text}</span>`
      );
    });
  };
};

module.exports = plugin;
