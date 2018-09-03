var titleBackup = document.title;

function updateFavicon(hex) {
  var canvas = document.createElement('canvas');
  if (! canvas.getContext) {
    return;
  }
  var ctx = canvas.getContext('2d');
  var img = document.createElement('img');
  img.onload = function () {
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    ctx.fillStyle = hex;
    ctx.fillRect(2, 4, 9, 8);
    $('#favicon').attr('href', canvas.toDataURL('image/png'));
  };
  img.src = '/developer.pebble.com/assets/favicon.png';
}

function selectColor($polygon) {
  var hexValue = $polygon.data('hex');
  var correctedHexValue = $polygon.attr('fill');
  var name = color_picker_colors[hexValue].name;
  $('#color-picker polygon').attr('stroke', '#fff').attr('stroke-width', '1.5');
  $polygon.attr('stroke', '#000').attr('stroke-width', '3');
  $polygon.parent().append($polygon);

  if (color_picker_colors[hexValue].url) {
    $('#js-picker-name-no-url').hide();
    $('#js-picker-name').text(name).attr('href', color_picker_colors[hexValue].url).show();
  }
  else {
    $('#js-picker-name-no-url').show().text(name);
    $('#js-picker-name').hide();
  }
  $('#js-picker-block').css('background-color', correctedHexValue);
  if (hexValue === '#FFFFFF') {
    $('#js-picker-block').css('border', '1px solid #000');
  }
  else {
    $('#js-picker-block').css('border', '0');
  }
  $('#js-picker-constant').text(color_picker_colors[hexValue].c_identifier);
  $('#js-picker-html').text(correctedHexValue.toUpperCase());
  $('#js-picker-html-uncorrected').text(hexValue.toUpperCase());
  $('#js-picker-rgb').text(color_picker_colors[hexValue].literals[1].value);
  $('#js-picker-hex').text(color_picker_colors[hexValue].literals[2].value);
  $('#js-picker-sample').html(Handlebars.templates['color-picker-sample-window']({ color_name: color_picker_colors[hexValue].c_identifier }));
  document.title = titleBackup.replace('Color Picker Tool', name + ' // Color Picker Tool');
  updateFavicon(hexValue);

  if (window.location.hash !== hexValue) {
    window.location = hexValue;
  }
}

function selectUrlColor() {
  if (! document.location.hash) {
    return;
  }
  var polygon = $('#color-picker polygon[data-hex="' + document.location.hash + '"]');
  if (polygon && polygon.length) {
    selectColor(polygon);
  }
}

function applyColorMap(map) {
  $('#color-picker polygon').each(function (index, elem) {
    if (map) {
      $(elem).attr('fill', map[$(elem).data('hex').toLowerCase()]);
    }
    else {
      $(elem).attr('fill', $(elem).data('hex'));
    }
  });
}

$(function () {
  $('#color-picker polygon').on('click', function (event) {
    selectColor($(this));
  });

  $('#color-picker polygon').each(function (index, elem) {
    $(elem).attr('data-hex', $(elem).attr('fill'));
  });

  $('.js-btn-colormap').on('click', function (event) {
    var type = $(this).data('colormap');
    switch (type) {
      case 'none':
        applyColorMap(null);
        break;
      case 'sunlight':
        applyColorMap(colorMappingSunlight);
        break;
    }
    selectUrlColor();
  });

  window.onpopstate = function(event) {
    selectUrlColor();
  };

  selectUrlColor();
});
