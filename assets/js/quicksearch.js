(function () {

  var searchLayouts = {
    1: [ 1 ],
    2: [ 1, 1 ],
    3: [ 1, 1, 1 ],
    4: [ 1, 1, 2 ],
    5: [ 1, 2, 2 ],
    6: [ 2, 2, 2 ],
  };

  var search = new Search({
    appId: 'BUJATNZD81',
    apiKey: 'a6ae8d3102bfac0a9db83fb51233ab95',
    prefix: 'devsite-live-',
    options: {
      hitsPerPage: 8,
      getRankingInfo: true,
      distinct: true
    }
  });
  search.on('results', showResults);
  search.on('clear', clearResults);
  search.on('error', function (err) {
    Rollbar.error('Quicksearch error', err);
  });


  var $input = $('#quicksearch');
  var $results = $('#quicksearch__results');
  var $blackout = $('#search__blackout');
  var selectedResult = [-1, -1];

  $input.on('keyup', function (event) {
    switch (event.keyCode) {
      case 40: // DOWN
        updateSelectedResult(1, 0);
      break;
      case 38: // UP
        updateSelectedResult(-1, 0);
      break;
      case 39: // RIGHT
        updateSelectedResult(0, 1);
      break;
      case 37: // LEFT
        updateSelectedResult(0, -1);
      break;
      case 13: // ENTER
        if (selectedResult[0] >= 0 && selectedResult[1] >= 0) {
          gotoSelectedResult();
        }
      break;
      case 27: // ESCAPE
        clearResults();
        $input.blur();
      break;
    }
    search.search($input.val());
  });

  $blackout.on('click', function () {
    hideResults();
  });

  function getOrderedIndexNames(results) {
    return Object.keys(results);
  }

  function showResults(results) {
    $results.html('');
    if (is.empty(results)) {
      showEmptyResults();
      return;
    }
    var indexes = getOrderedIndexNames(results);
    var numResults = Object.keys(results).length;
    var layout = searchLayouts[numResults];
    var $row = $('<div>').addClass('row');
    buildLayout($row, layout);
    indexes.forEach(function (index, pos) {
      var $container = getContainer($row, pos);
      $container.addClass('quicksearch__block--' + Search.indexes[index].cssClass);
      var searchResults = new SearchResults(results[index], Search.indexes[index], $container.data('result-limit'));
      searchResults.render($container);
    });
    $results.append($row).show();
    $blackout.fadeIn(100);
    $('body').addClass('stop-scrolling');
  }

  function showEmptyResults() {
    $results.html(Handlebars.templates['quicksearch-no-results']());
  }

  /**
   * buildLayout
   * Takes a layout array and builds the DOM elements inside the given row
   * param $row The DOM element to build the search layout inside of
   * param layout The search layout array to build the layout from.
   **/
  function buildLayout($row, layout) {
    var colWidth = Math.min(12 / layout.length, 12);
    var index = 0;
    layout.forEach(function (col, c) {
      var $col = $('<div>').addClass('col-l-' + colWidth);
      for (var r = 0; r < col; r += 1) {
        var $block = $('<div>').addClass('quicksearch__block')
          .attr('data-result-container', index)
          .attr('data-result-limit', col == 2 ? 3 : 6);
        $col.append($block);
        index += 1;
      }
      $row.append($col);
    });
  }

  /**
   * getContainer
   * Finds a search result container that was built using buildLayout
   * @param $row The DOM element that contains all of the result containers
   * @param pos The index of the container
   * @returns The results container for the given index as a DOM element
   **/
  function getContainer($row, index) {
    return $row.find('[data-result-container="' + index + '"]');
  }

  function clearResults() {
    hideResults();
    $results.find('ul').html('');
  }

  function hideResults() {
    $blackout.fadeOut(100, function () {
      $results.hide();
      $('body').removeClass('stop-scrolling');
    });
  }

  function updateSelectedResult(dx, dy) {

  }

  function gotoSelectedResult() {

  }

}());
