import $ from 'jquery'

require('slick-carousel')

$(document).ready(() => {
  $('.photos').each((index, el) => {
    $(el).slick({
      arrows: false,
      centerMode: true,
      centerPadding: '60px',
      dots: true,
      slidesToShow: 3,
      variableWidth: true,
    })
  })
})
