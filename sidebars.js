/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  javascriptSidebar: [{ type: 'autogenerated', dirName: 'javascript' }],
  typescriptSidebar: [{ type: 'autogenerated', dirName: 'typescript' }],
  nextJsSidebar: [{ type: 'autogenerated', dirName: 'next-js' }],
  jestSidebar: [{ type: 'autogenerated', dirName: 'test/jest' }],
  cypressSidebar: [{ type: 'autogenerated', dirName: 'test/cypress' }],
  playwrightSidebar: [{ type: 'autogenerated', dirName: 'test/playwright' }],
  tanstackQuerySidebar: [
    { type: 'autogenerated', dirName: 'miscellaneous/tanstack-query' },
  ],
  nextAuthJsSidebar: [
    { type: 'autogenerated', dirName: 'miscellaneous/nextauthjs' },
  ],
  chakraUISidebar: [
    { type: 'autogenerated', dirName: 'miscellaneous/chakra-ui' },
  ],
  prismaSidebar: [{ type: 'autogenerated', dirName: 'miscellaneous/prisma' }],
  emmetSidebar: [{ type: 'autogenerated', dirName: 'miscellaneous/emmet' }],
  regularExpressionSidebar: [
    { type: 'autogenerated', dirName: 'miscellaneous/regular-expression' },
  ],
  yupSidebar: [{ type: 'autogenerated', dirName: 'miscellaneous/yup' }],
  conceptSidebar: [{ type: 'autogenerated', dirName: 'concepts' }],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
