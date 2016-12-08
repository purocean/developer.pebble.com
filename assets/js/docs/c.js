$(function () {
  
  $('.docs__item__tabs a[data-platform]').on('click', function () {
    var offset = $(this).position().top - $('body').scrollTop();
    var platform = $(this).data('platform');
    showPlatform(platform);
    savePlatform(platform);
    var newOffset = $(this).position().top - $('body').scrollTop();
    $('body').scrollTop($('body').scrollTop() + (newOffset - offset));
  });
  
  function showPlatform(platform) {
    $('.docs__item__tabs a[data-platform]').removeClass('active');
    $('.docs__item__tabs a[data-platform="' + platform + '"]').addClass('active');
    $('section[data-platform]').hide();
    $('section[data-platform="' + platform + '"]').show();
  }
  
  function savePlatform(platform) {
    Cookies.set('docs-platform', platform);
  }

  var defaultPlatform = $('[data-basalt-only]').length ? 'basalt' : 'aplite';
  showPlatform(Cookies.get('docs-platform') || defaultPlatform);

});
