const visit = require('unist-util-visit');

const plugin = () => {
  const transformer = async (ast) => {
    visit(ast, 'html', (node) => {
      node.value = node.value.replace(
        /\*\*(\S+?.*?\S+?|\S+?)\*\*/g,
        (_, text) => `<span class="code-inline-highlight">${text}</span>`
      );
    });
  };
  return transformer;
};

module.exports = plugin;
