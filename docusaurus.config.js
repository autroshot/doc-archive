// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '문서 저장소',
  tagline: '개인적으로 번역하거나 정리한 문서들을 모아 놓은 곳입니다.',
  url: 'https://autroshot.github.io/',
  baseUrl: '/docs-repository/',
  staticDirectories: ['static'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
      'docusaurus-preset-shiki-twoslash',
      {
        themes: ['min-light', 'nord'],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: '문서 저장소',
        logo: {
          alt: '사이트 로고',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'next-js/README',
            position: 'left',
            label: 'Next.js',
          },
          {
            type: 'doc',
            docId: 'cypress/README',
            position: 'left',
            label: 'Cypress',
          },
          {
            type: 'dropdown',
            label: '기타',
            position: 'left',
            items: [
              {
                type: 'doc',
                label: 'Emmet',
                docId: 'miscellaneous/emmet/README',
              },
              { type: 'doc', label: 'Yup', docId: 'miscellaneous/yup/README' },
              {
                type: 'doc',
                label: '정규 표현식',
                docId: 'miscellaneous/regular-expression/README',
              },
            ],
          },
          {
            href: 'https://github.com/autroshot/docs-repository',
            label: 'GitHub',
            position: 'right',
          },
        ],
        hideOnScroll: true,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Next.js',
                to: '/docs/next-js',
              },
              {
                label: 'Cypress',
                to: '/docs/cypress',
              },
              {
                label: 'Emmet',
                to: '/docs/miscellaneous/emmet',
              },
              {
                label: 'Yup',
                to: '/docs/miscellaneous/yup',
              },
              {
                label: '정규 표현식',
                to: '/docs/miscellaneous/regular-expression',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/autroshot/docs-repository',
              },
            ],
          },
        ],
        copyright: `Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
