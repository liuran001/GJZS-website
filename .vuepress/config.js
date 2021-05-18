const moment = require('moment')
const langMap = {
  "zh-Hans": "zh-cn"
}

var timestampCache = {}

module.exports = {
  base: '/',
  title: '搞机助手重制版',
  head: [
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://raw.rikka.app/css/SourceCodePro-BDC.css'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,500,700&display=swap'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500,700&display=swap'
    }],
    ['link', { rel: 'apple-touch-icon', size: '57x57', href: '/icon/apple-icon-57x57.png' }],
    ['link', { rel: 'apple-touch-icon', size: '60x60', href: '/icon/apple-icon-60x60.png' }],
    ['link', { rel: 'apple-touch-icon', size: '72x72', href: '/icon/apple-icon-72x72.png' }],
    ['link', { rel: 'apple-touch-icon', size: '76x76', href: '/icon/apple-icon-76x76.png' }],
    ['link', { rel: 'apple-touch-icon', size: '114x114', href: '/icon/apple-icon-114x114.png' }],
    ['link', { rel: 'apple-touch-icon', size: '120x120', href: '/icon/apple-icon-120x120.png' }],
    ['link', { rel: 'apple-touch-icon', size: '144x144', href: '/icon/apple-icon-144x144.png' }],
    ['link', { rel: 'apple-touch-icon', size: '152x152', href: '/icon/apple-icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', size: '180x180', href: '/icon/apple-icon-180x180.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '192x192', href: '/icon/android-icon-192x192.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '32x32', href: '/icon/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '96x96', href: '/icon/favicon-96x96.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '16x16', href: '/icon/favicon-16x16.png' }]
  ],
  locales: {
    '/': {
      lang: 'zh-Hans',
      description: '玩机小白的福音'
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: '语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        sidebar: getSidebar('/guide/', '指南'),
        nav: getNavbar('/', '指南', '下载', 'Changelog'),
        lastUpdated: '最后更新'
      },
    displayAllHeaders: true,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: true
    },
    docsRepo: 'https://github.com/liuran001/GJZS-website',
    docsDir: '/',
    editLinks: true
  },
  plugins: [
    [
      'sitemap',
      {
        hostname: 'https://gjzs.qqcn.site',
        exclude: ['/404.html'],
        dateFormatter: (time) => {
          timestampCache[time]
        }
      }
    ],
    [
      'clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html'
      }
    ],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          var original = timestamp

          moment.locale(langMap[lang])
          var localized = moment(original).format('lll')
          
          moment.locale('en')
          var iso = moment(original).toISOString()
          timestampCache[localized] = iso

          return localized
        }
      }
    ]
  ]
}

function getSidebar(指南) {
  var res = {}
  res[prefix] = [
    {
      title: basicTitle,
      collapsable: true,
      sidebarDepth: 0,
      children: [
        '',
      ]
    },
]
  return res
}

function getNavbar(prefix, guide, download, changelog, allRikkaApps) {
  return [
    { text: 指南, link: `${prefix}guide/` },
    { text: 下载, link: `${prefix}download.html` },
    { text: Changelog, link: `${prefix}changelog.html` },
  ]
}