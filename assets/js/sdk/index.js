$sdkLink = $('.js-sdk-link');
$('.instructions-other').hide();
if ((navigator.userAgent.match(/MSIE/i)) || (navigator.userAgent.match(/Windows/i))) {
  $sdkLink.attr('href', '/sdk/install/windows/');
  $('.instructions-windows').show();
}
else if (navigator.userAgent.match(/Macintosh/i)) {
  $sdkLink.attr('href', '/sdk/install/mac/');
  $('.instructions-mac').show();
  if (document.location.hash === '#homebrew') {
    setTimeout(function () {
      $('a[data-modal-target="#modal-mac-auto"]').click();
    }, 100);
  }
}
else if (navigator.userAgent.match(/Linux/i) && ! navigator.userAgent.match(/Android/i)) {
  $sdkLink.attr('href', '/sdk/install/linux/');
  $('.instructions-linux').show();
}
else {
  $('.instructions-other').show();
}
