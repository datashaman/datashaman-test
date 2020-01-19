import $ from 'domtastic'

$(document).ready(() => {
  $(document)
    .on('click focus', '.photos [data-target]', function(evt) {
      evt.preventDefault()

      $($(this).data('target')).addClass('lightbox-show')
    })
    .on('blur', '.photos [data-target]', function() {
      $(this)
        .closest('.lightbox')
        .removeClass('lightbox-show')
    })
    .on('click', '.photos .close', function(evt) {
      evt.preventDefault()

      $(this)
        .closest('.lightbox')
        .removeClass('lightbox-show')
    })
})
