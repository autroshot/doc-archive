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
  organizationName: 'autroshot', // Usually your GitHub org/user name.
  projectName: 'docs-repository', // Usually your repo name.
  trailingSlash: false,

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
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        gtag: {
          trackingID: 'G-XLF32HX6M9',
          anonymizeIP: true,
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
          hideable: true,
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
                label: 'JavaScript',
                docId: 'miscellaneous/javascript/배열과-메서드',
              },
              {
                type: 'doc',
                label: 'TypeScript',
                docId: 'miscellaneous/typescript/README',
              },
              {
                type: 'doc',
                label: 'NextAuth.js',
                docId: 'miscellaneous/next-auth-js/README',
              },
              {
                type: 'doc',
                label: 'Chakra UI',
                docId: 'miscellaneous/chakra-ui/README',
              },
              {
                type: 'doc',
                label: 'Jest',
                docId: 'miscellaneous/jest/README',
              },
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
            href: 'https://docs-glossary.vercel.app/',
            label: '용어집',
            position: 'right',
          },
          {
            href: 'https://github.com/autroshot/docs-repository',
            position: 'right',
            className: 'header-github-link',
            'aria-label': '깃허브',
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
                label: 'JavaScript',
                to: '/docs/miscellaneous/javascript/배열과-메서드',
              },
              {
                label: 'TypeScript',
                to: '/docs/miscellaneous/typescript',
              },
              {
                label: 'NextAuth.js',
                to: '/docs/miscellaneous/next-auth-js',
              },
              {
                label: 'Chakra UI',
                to: '/docs/miscellaneous/chakra-ui',
              },
              {
                label: 'Jest',
                to: '/docs/miscellaneous/jest',
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
                label: '용어집',
                href: 'https://docs-glossary.vercel.app/',
              },
              {
                label: '깃허브',
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
  plugins: [
    ['@docusaurus/plugin-ideal-image', { disableInDev: false }],
  ],
};

module.exports = config;
