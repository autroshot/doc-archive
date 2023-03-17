// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '문서 저장소',
  tagline: '개인적으로 번역하거나 정리한 문서를 모아 놓은 곳입니다.',
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
            docId: 'javascript/keyboard-keydown-and-keyup',
            label: 'JavaScript',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'typescript/README',
            label: 'TypeScript',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'next-js/README',
            label: 'Next.js',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: '테스트',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'test/jest/README',
                label: 'Jest',
              },
              {
                type: 'doc',
                docId: 'test/cypress/README',
                label: 'Cypress',
              },
              {
                type: 'doc',
                docId: 'test/playwright/README',
                label: 'Playwright',
              },
            ],
          },
          {
            type: 'dropdown',
            label: '기타',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'miscellaneous/tanstack-query/README',
                label: 'TanStack Query',
              },
              {
                type: 'doc',
                docId: 'miscellaneous/nextauthjs/README',
                label: 'NextAuth.js',
              },
              {
                type: 'doc',
                docId: 'miscellaneous/chakra-ui/README',
                label: 'Chakra UI',
              },
              {
                type: 'doc',
                docId: 'miscellaneous/prisma/README',
                label: 'Prisma',
              },
              {
                type: 'doc',
                docId: 'miscellaneous/emmet/README',
                label: 'Emmet',
              },
              { type: 'doc', docId: 'miscellaneous/yup/README', label: 'Yup' },
              {
                type: 'doc',
                docId: 'miscellaneous/regular-expression/README',
                label: '정규 표현식',
              },
            ],
          },
          {
            type: 'doc',
            docId: 'concepts/domain-name',
            label: '개념',
            position: 'left',
          },
          {
            to: '/source',
            label: '출처',
            position: 'right',
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
                label: 'JavaScript',
                to: '/docs/javascript/keyboard-keydown-and-keyup',
              },
              {
                label: 'TypeScript',
                to: '/docs/typescript',
              },
              {
                label: 'Next.js',
                to: '/docs/next-js',
              },
              {
                label: 'Jest',
                to: '/docs/test/jest',
              },
              {
                label: 'Cypress',
                to: '/docs/test/cypress',
              },
              {
                label: 'Playwright',
                to: '/docs/test/playwright',
              },
              {
                label: 'TanStack Query',
                to: '/docs/miscellaneous/tanstack-query',
              },
              {
                label: 'NextAuth.js',
                to: '/docs/miscellaneous/nextauthjs',
              },
              {
                label: 'Chakra UI',
                to: '/docs/miscellaneous/chakra-ui',
              },
              {
                label: 'Prisma',
                to: '/docs/miscellaneous/prisma',
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
                to: '/source',
                label: '출처',
              },
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
  plugins: [['@docusaurus/plugin-ideal-image', { disableInDev: false }]],
  themes: [
    [
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexBlog: false,
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        language: ['en', 'ko'],
      },
    ],
  ],
};

module.exports = config;
