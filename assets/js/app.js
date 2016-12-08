(function () {

  $.get('/mobilenav.html', function (response) {
    $('body').append(response);
    $(".js-mobile-nav a").each(function (index, elem) {
      if ($(elem).attr('href') == window.location.pathname) {
        $(elem).parent().addClass('active');
      }
    });
    $(".js-mobile-nav").mmenu({
      footer: {
        add: true,
        content: '<a href="https://www.pebble.com/legal/privacy/" target="_blank">Privacy Policy</a> &middot; <a href="https://www.pebble.com/legal/cookies/" target="_blank">Cookie Policy</a>'
      }
    }, {
      classNames: {
        selected: 'active'
      }
    });
    $('body').trigger('pbl-menu-loaded');
  });

  $('.js-toc-select').on('change', function () {
    var url = $(this).val();
    if (! url) {
      return;
    }
    if (url[0] == '/') {
      window.location = url;
    }
    else {
      window.location = '#' + url;
    }
  });

  $('.js-mobile-nav-toggle').on('click', function () {
   $('.js-mobile-nav').trigger("open.mm");
  });

  // Handles affixing the gray-box to the right hand side of the page
  // so it will stay in position when you scroll.
  $('.gray-box--fixed').each(function (index, elem) {
    var $graybox = $(elem);
    var $parent = $graybox.parent();
    $graybox.css('position', 'fixed');
    $(window).on('resize', function () {
      updateGraybox();
    });
    updateGraybox();

    function updateGraybox() {
      $graybox.css('height', 'auto');
      $graybox.css('left', $parent.offset().left);
      $graybox.css('width', $parent.width());
      var maxHeight = $(window).height() - $graybox.position().top - 10;
      if ($graybox.height() > maxHeight) {
        $graybox.css('height', maxHeight);
      }
    }
  });

  if ($('.gray-box--scrollspy').length) {
    var triggers = [];
    $('.toc__item').each(function (index, item) {
      var url = $(item).find('a').attr('href');
      var id = url.substr(url.indexOf('#') + 1);
      var $header = $('[id="' + id + '"]');
      if ($header && $header.length) {
        triggers.push({
          from: $header.position().top,
          item: $(item)
        });
      }
    });
    $(window).on('scroll', function () {
      var pos = $(window).scrollTop();
      pos += $(window).height() / 8;
      triggers.forEach(function (trigger) {
        if (pos >= trigger.from) {
          $('.toc__item--active').removeClass('toc__item--active');
          trigger.item.addClass('toc__item--active');
        }
      });
    });
  }

  ZeroClipboard.config({ swfPath: "/assets/other/ZeroClipboard.swf" });

  // Adding ClickToCopy to the code blocks.
  $('.highlight:not(.no-copy)').append('<a href="javascript:void(0)" class="code-copy-link"><i class="fa fa-clipboard fa-fw"></i></a>');
  var copyLinkZero = new ZeroClipboard($('.code-copy-link'));
  copyLinkZero.on('copy', function (event) {
    var clipboard = event.clipboardData;
    clipboard.setData('text/plain', $(event.target).parent().find('pre').text());
    $('span', event.target).text('COPIED!');
  });

  $().prettyEmbed({
    useFitVids: true
  });

  $('body').on('mouseover', '.code-copy-link', function () {
    $(this).prepend('<span>COPY</span>');
  });

  $('body').on('mouseout', '.code-copy-link', function () {
    $('span', this).remove();
  });

  $('.js-doc-menu-toggle').click(function (e) {
    e.preventDefault();
    $('.js-doc-menu').toggleClass('documentation-menu--visible');
  });

  /* SDK Platform */

  if (Cookies.get('sdk-platform')) {
    showPlatformSpecifics(Cookies.get('sdk-platform'));
  }
  else if (queryString.parse(location.search).sdk === 'local') {
    setPlatform('local');
  }
  else if (queryString.parse(location.search).sdk === 'cloudpebble') {
    setPlatform('cloudpebble');
  }
  else {
    $('.platform-choice--large').show();
  }

  $('.js-platform-choice').on('click', function (event) {
    event.preventDefault();
    setPlatform($(this).data('sdk-platform'));
  });

  function setPlatform(platform) {
    Cookies.set('sdk-platform', platform);
    showPlatformSpecifics(platform);
  }

  function showPlatformSpecifics(platform) {
    $('.platform-choice--large').hide();
    $('.platform-specific').hide();
    $('.platform-specific[data-sdk-platform="' + platform + '"]').show();
    $('.platform-choice--small').show();
  }

  $('a[data-modal-target]').on('show.r.modal', function(event) {
    // TODO: Track this in the analytics.
  });

  $('body').on('pbl-menu-loaded', function () {
    $('.video--autoplay').each(function () {
      this.play();
    });
  });

  // SCREENSHOT VIEWER

  $('.js-screenshot-tabs h4').on('click', function () {
    var $viewer = $(this).parents('.screenshot-viewer');
    if (!$viewer.hasClass('screenshot-viewer--tabbed')) {
      return;
    }

    var platform = $(this).data('platform');

    $('.js-screenshot-tabs h4').removeClass('selected');
    $('.js-screenshot-tabs h4[data-platform="' + platform + '"]').addClass('selected');

    $('.screenshot-viewer__platform').hide();
    $('.screenshot-viewer__platform[data-platform="' + platform + '"]').show();
  });

  function updateScreenshotViewers() {
    $('.screenshot-viewer').each(function (index, elem) {
      var $viewer = $(elem);
      if ($viewer.hasClass('screenshot-viewer--tabbed')) {
        return;
      }

      var $screenshots = $viewer.find('.screenshot-viewer__screenshots');
      var width = $screenshots.find('.screenshot-viewer__platform').map(function (index, elem) {
        return $(elem).width();
      }).toArray().reduce(function (previous, current) {
        return previous + current;
      });
      if (width > $viewer.width()) {
        $viewer.addClass('screenshot-viewer--tabbed');
        $('.js-screenshot-tabs h4:last-child').click();
      }
    });
  }

  $(window).on('resize', function () {
    updateScreenshotViewers();
  });
  updateScreenshotViewers();

}());
