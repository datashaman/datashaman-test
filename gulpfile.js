const { dest, parallel, series, src, watch } = require('gulp')
const del = require('del')

const slickFiles = [
  'node_modules/slick-carousel/slick/**/*',
]

const styleFiles = [
  'node_modules/purecss/build/pure-min.css',
  'src/_styles/custom.css',
]

function clean() {
  return del(
    [
      '_site/slick',
      '_site/styles',
    ]
  )
}

function slick() {
  return src(slickFiles)
    .pipe(dest('_site/slick'))
}

function styles() {
  return src(styleFiles)
    .pipe(dest('_site/styles'))
}

const assets = parallel(styles, slick)

exports.build = parallel(slick, styles)
exports.clean = clean
exports.default = series(clean, exports.build)
exports.watch = function () {
  watch(styleFiles, {ignoreInitial: false}, styles)
  watch(slickFiles, {ignoreInitial: false}, slick)
}
