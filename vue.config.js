'use strict'
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'Dots'

// See https://www.priestch.com/two-ways-use-svg-icons-in-vue-cli3-based-project/

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const IconfontWebpackPlugin = require('iconfont-webpack-plugin')

function tapPostcssLoaderOptions(config, moduleRule, rule) {
  config.module
    .rule(moduleRule)
    .oneOf(rule)
    .use('postcss-loader')
    .loader('postcss-loader')
    .tap(options => {
      const iconFontOptions = {
        plugins: (loader) => {
          return [
            new IconfontWebpackPlugin(loader)
          ]
        }
      }
      Object.assign(options, iconFontOptions)
      return options
    })
}

function configIconFont(config) {
  // Sass is the pre-processor of my project
  // Replace with yours
  //
  // Tips
  // Use `vue inspect --rules` view rules used in project
  // Use `vue inspect --rule scss` view special rule
  const moduleRules = ['scss', 'css']
  const rules = ['normal', 'normal-modules', 'vue', 'vue-modules']
  for (let i = 0; i < moduleRules.length; i++) {
    const moduleRule = moduleRules[i]
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      tapPostcssLoaderOptions(config, moduleRule, rule)
    }
  }
}

function configSVGIcon(config) {
  // Exclude SVG sprite directory from default svg rule
  config.module
    .rule('svg')
    .exclude.add(path.resolve(__dirname, './src/icons/svg'))
    .end()

  // Options used by svgo-loader to optimize SVG files
  // https://github.com/svg/svgo#what-it-can-do
  const options = {
    'plugins': [
      { 'cleanupAttrs': true },
      { 'cleanupEnableBackground': true },
      { 'cleanupIDs': true },
      { 'cleanupListOfValues': true },
      { 'cleanupNumericValues': true },
      { 'collapseGroups': true },
      { 'convertColors': true },
      { 'convertPathData': true },
      { 'convertShapeToPath': true },
      { 'convertStyleToAttrs': true },
      { 'convertTransform': true },
      { 'mergePaths': true },
      { 'removeComments': true },
      { 'removeDesc': true },
      { 'removeDimensions': true },
      { 'removeDoctype': true },
      { 'removeEditorsNSData': true },
      { 'removeEmptyAttrs': true },
      { 'removeEmptyContainers': true },
      { 'removeEmptyText': true },
      { 'removeHiddenElems': true },
      { 'removeMetadata': true },
      { 'removeNonInheritableGroupAttrs': true },
      { 'removeRasterImages': true },
      { 'removeTitle': true },
      { 'removeUnknownsAndDefaults': true },
      { 'removeUselessDefs': true },
      { 'removeUnusedNS': true },
      { 'removeUselessStrokeAndFill': true },
      {
        'removeAttrs': { 'attrs': 'fill' } // 移除fill属性
      },
      { 'removeXMLProcInst': true },
      { 'removeStyleElement': true },
      { 'removeUnknownsAndDefaults': true },
      { 'sortAttrs': true }
    ]
  }

  // Include only SVG sprite directory for new svg-icon rule
  // Use svg-sprite-loader to build SVG sprite
  // Use svgo-loader to optimize SVG files
  config.module
    .rule('svg-icon')
    .test(/\.svg$/)
    .include.add(path.resolve(__dirname, './src/icons/svg'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()
    .use('svgo-loader')
    .loader('svgo-loader')
    .options(options)
    .end()
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@hikaya/hakawati/src/styles/theme.scss";`
      }
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    configIconFont(config)
    configSVGIcon(config)
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl'
      }),
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'mapbox-gl-css',
            entry: {
              path: 'https://api.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.css',
              type: 'css'
            }
          },
          {
            module: 'mapbox-gl-draw-css',
            entry: {
              path: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css',
              type: 'css'
            }
          }
        ]
      })
    ]
  }
}
