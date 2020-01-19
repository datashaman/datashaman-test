import $ from 'domtastic'

$(document).ready(() => {
  $(document)
    .on('click', '.lightbox__thumbnail', function(evt) {
      console.log('Clicked on thumbnail')
      evt.preventDefault()

      $($(this).attr('href')).addClass('lightbox--show')
    })
    .on('click', '.lightbox__close', function(evt) {
      console.log('Clicked close')
      evt.preventDefault()

      $(this)
        .closest('.lightbox')
        .removeClass('lightbox--show')
    })
    .on('keyup', function(evt) {
      console.log(evt)
      if (evt.keyCode === 27) {
        $('.lightbox--show').removeClass('lightbox--show')
      }
    })
})
