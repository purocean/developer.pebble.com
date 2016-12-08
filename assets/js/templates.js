(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['color-picker-sample-window'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"highlight\"><pre><span class=\"n\">Window</span> <span class=\"o\">*</span><span class=\"n\">window</span> <span class=\"o\">=</span> <span class=\"n\">window_create</span><span class=\"p\">();</span>\n<span class=\"n\">window_set_background_color</span><span class=\"p\">(</span><span class=\"n\">window</span><span class=\"p\">,</span> <span class=\"k\">"
    + container.escapeExpression(((helper = (helper = helpers.color_name || (depth0 != null ? depth0.color_name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color_name","hash":{},"data":data}) : helper)))
    + "</span><span class=\"p\">);</span>\n<span class=\"n\">window_stack_push</span><span class=\"p\">(</span><span class=\"n\">window</span><span class=\"p\">,</span> <span class=\"nb\">true</span><span class=\"p\">);</span>\n</pre></div>\n";
},"useData":true});
templates['events-info-none'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"alert alert--fg-white alert--bg-green\">\n  <p>There are currenly no events scheduled for "
    + alias4(((helper = (helper = helpers.month || (depth0 != null ? depth0.month : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"month","hash":{},"data":data}) : helper)))
    + ".</p>\n  <p>Try changing the month using the calendar controls on the map above.</p>\n  <p>If you know about an event happening in "
    + alias4(((helper = (helper = helpers.month || (depth0 != null ? depth0.month : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"month","hash":{},"data":data}) : helper)))
    + ", use <a href=\"javascript:void();\" data-modal-target=\"#overlay-events-form\">the submission form</a> to let us know!</p>\n</div>\n";
},"useData":true});
templates['events-info'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-m-12\">\n  <article class=\"event\" data-event-number=\""
    + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"number","hash":{},"data":data}) : helper)))
    + "\">\n    <h3><a href=\""
    + alias4(((helper = (helper = helpers.website || (depth0 != null ? depth0.website : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"website","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.dateString || (depth0 != null ? depth0.dateString : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dateString","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "</a></h3>\n    <p class=\"event__meta\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + " | <a href=\"javascript:void(0);\" class=\"event__toggle\">More</a></p>\n    <div class=\"event__description hidden\" hidden>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n  </article>\n</div>\n";
},"useData":true});
templates['quicksearch-no-results'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n  <div class=\"col-l-12\">\n    <p class=\"quicksearch__no-results\">There were no search results.</p>\n  </div>\n</div>\n";
},"useData":true});
templates['quicksearch-result-group'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <li class=\"quicksearch__result\">\n    <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n    <p class=\"quicksearch__section\">"
    + ((stack1 = ((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n    <p class=\"quicksearch__summary\">"
    + ((stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summary","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n  </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<h3>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n<ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});
})();