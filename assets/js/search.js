/* export SearchResults */
/* export Search */

function SearchResults(results, type, limit) {
  this.results = results;
  this.type = type;
  this.limit = limit;
};

SearchResults.prototype.render = function($container) {
  this.results.hits.splice(this.limit, this.results.hits.length);
  this.results.hits.forEach(processResult.bind(this));
  var $resultGroup = $(Handlebars.templates['quicksearch-result-group']({
    title: this.type.title,
    results: this.results.hits
  }));
  $container.append($resultGroup);
};

function processResult(result) {
  if (result._snippetResult && result._snippetResult.content) {
    result.summary = result._snippetResult.content.value;
  }
  else if (result._snippetResult && result._snippetResult.summary) {
    result.summary = result._snippetResult.summary.value;
  }
  if (this.type.section) {
    result.section = this.type.section(result).join(' &middot; ');
  }
  else {
    result.section = '';
  }
}

function Search(config) {
  this.client = new AlgoliaSearch(config.appId, config.apiKey);
  this.prefix = config.prefix;
  this.searchNumber = 0;
  this.lastQuery = null;
  this.searchOptions = config.options;
}

heir.inherit(Search, EventEmitter);

Search.indexes = {
  'guides': {
    title: 'Guides',
    cssClass: 'guides',
    section: function (hit) {
      var section = [ hit.group ];
      if (hit.subgroup && hit.subgroup.length) {
        section.push(hit.subgroup);
      }
      return section;
    }
  },
  'documentation': {
    title: 'Documentation',
    cssClass: 'docs',
    section: function (hit) {
      return [ hit.language ]
    }
  },
  'blog-posts': {
    title: 'Blog Posts',
    cssClass: 'more',
    section: function (hit) {
      var dateString = hit.posted.split(" ")[0];
      if (!dateString) return "Invalid Date";

      return [ moment(dateString).format('MMM DD YYYY')];
    }
  },
  'examples': {
    title: 'Examples',
    cssClass: 'more',
  },
  'community-resources': {
    title: 'Community Resources',
    cssClass: 'community',
    section: function (hit) {
      switch(hit.resourceType) {
        case 'community_tools':
          return ['Tool'];
        case 'community_apps':
          return ['App'];
        case 'community_libraries':
          return ['Library']
      }
      return [];
    }
  },
  'other': {
    title: 'Other',
    cssClass: 'other'
  }
};

Search.prototype.search = function (query) {
  if (query === this.lastQuery) {
    return;
  }
  if (query.length <= 2) {
    this.emitEvent('clear');
    return;
  }
  this.searchNumber += 1;
  var thisNumber = this.searchNumber;
  this.client.startQueriesBatch();
  Object.keys(Search.indexes).forEach(function (type) {
    this.client.addQueryInBatch(this.prefix + type, query, this.searchOptions);
  }.bind(this));
  this.client.sendQueriesBatch(function (success, content) {
    if (thisNumber !== this.searchNumber) {
      return;
    }
    if (! success) {
      this.emitEvent('error', new Error('Algolia responded with a failure event.'));
    }
    if (! content.results) {
      this.emitEvent('error', new Error('No results returned from Algolia.'));
    }
    var results = {};
    content.results.forEach(function (result) {
      if (result.hits.length > 0) {
        var index = result.index.replace(this.prefix, '');
        results[index] = result;
      }
    }.bind(this));
    this.emitEvent('results', [ results ]);
  }.bind(this));
};
