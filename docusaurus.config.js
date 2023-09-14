// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config();
const codeInlineHighlight = require('./src/remark/code-inline-highlight');

let trailingSlash = process.env.TRAILING_SLASH;
if (trailingSlash) {
  if (trailingSlash === 'true') {
    // @ts-ignore
    trailingSlash = true;
  } else {
    // @ts-ignore
    trailingSlash = false;
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '문서 보관소',
  tagline: '공식 문서는 가장 좋은 설명서입니다.',
  url: process.env.URL,
  baseUrl: process.env.BASE_URL,
  staticDirectories: ['static'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.ORGANIZATION_NAME, // Usually your GitHub org/user name.
  projectName: process.env.PROJECT_NAME, // Usually your repo name.
  // @ts-ignore
  trailingSlash: trailingSlash,

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
          remarkPlugins: [[codeInlineHighlight, ['tailwind-css\\']]],
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('@fontsource/nanum-gothic'),
            require.resolve('./src/css/custom.css'),
          ],
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
        themes: ['dark-plus', 'dark-plus'],
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
        title: '문서 보관소',
        logo: {
          alt: '사이트 로고',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'javascript/keyboard-keydown-and-keyup',
            label: 'JS',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'typescript/README',
            label: 'TS',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'react/README',
            label: 'React',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: '프레임워크',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'nextjs/README',
                label: 'Next.js',
              },
              {
                type: 'doc',
                docId: 'electron/README',
                label: 'Electron',
              },
            ],
          },
          {
            type: 'dropdown',
            label: '테스트',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'jest/README',
                label: 'Jest',
              },
              {
                type: 'doc',
                docId: 'cypress/README',
                label: 'Cypress',
              },
              {
                type: 'doc',
                docId: 'playwright/README',
                label: 'Playwright',
              },
            ],
          },
          {
            type: 'dropdown',
            label: '상태 관리',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'zustand/README',
                label: 'Zustand',
              },
              {
                type: 'doc',
                docId: 'tanstack-query/README',
                label: 'TanStack Query',
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
                docId: 'nextauthjs/README',
                label: 'NextAuth.js',
              },
              {
                type: 'doc',
                docId: 'vanilla-extract/README',
                label: 'Vanilla Extract',
              },
              {
                type: 'doc',
                docId: 'tailwind-css/README',
                label: 'Tailwind CSS',
              },
              {
                type: 'doc',
                docId: 'chakra-ui/README',
                label: 'Chakra UI',
              },
              {
                type: 'doc',
                docId: 'prisma/README',
                label: 'Prisma',
              },
              {
                type: 'doc',
                docId: 'docusaurus/README',
                label: 'Docusaurus',
              },
              {
                type: 'doc',
                docId: 'emmet/README',
                label: 'Emmet',
              },
              { type: 'doc', docId: 'yup/README', label: 'Yup' },
              {
                type: 'doc',
                docId: 'regular-expression/README',
                label: '정규 표현식',
              },
            ],
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
            href: 'https://github.com/autroshot/doc-archive',
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
                label: 'React',
                to: '/docs/react',
              },
              {
                label: 'Next.js',
                to: '/docs/nextjs',
              },
              {
                label: 'Electron',
                to: '/docs/electron',
              },
              {
                label: 'Jest',
                to: '/docs/jest',
              },
              {
                label: 'Cypress',
                to: '/docs/cypress',
              },
              {
                label: 'Playwright',
                to: '/docs/playwright',
              },
              {
                label: 'Zustand',
                to: '/docs/zustand',
              },
              {
                label: 'TanStack Query',
                to: '/docs/tanstack-query',
              },
              {
                label: 'NextAuth.js',
                to: '/docs/nextauthjs',
              },
              {
                label: 'Vanilla Extract',
                to: '/docs/vanilla-extract',
              },
              {
                label: 'Tailwind CSS',
                to: '/docs/tailwind-css',
              },
              {
                label: 'Chakra UI',
                to: '/docs/chakra-ui',
              },
              {
                label: 'Prisma',
                to: '/docs/prisma',
              },
              {
                label: 'Docusaurus',
                to: '/docs/docusaurus',
              },
              {
                label: 'Emmet',
                to: '/docs/emmet',
              },
              {
                label: 'Yup',
                to: '/docs/yup',
              },
              {
                label: '정규 표현식',
                to: '/docs/regular-expression',
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
                href: 'https://github.com/autroshot/doc-archive',
              },
            ],
          },
        ],
        copyright: `Built with Docusaurus.`,
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
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        },
      },
    }),
  },
};

module.exports = config;
