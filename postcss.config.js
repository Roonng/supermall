module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视图的宽度， 对应的是我们设计稿的宽度。
      viewportHeight: 667, //视角的高度，对应的是我们设计稿的高度。(也可以不配置)
      unitPrecision: 5, //指定
      viewportUnit: 'vw',
      selectorBlackList: ['ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      // exclude: [/TabBar/]
    }
  }
}
