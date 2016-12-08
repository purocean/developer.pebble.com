$(function () {

  var $thread = $('#disqus_thread');
  if (! $thread || $thread.length === 0) {
    return;
  }

  var disqus_shortname = 'pebbletechblog';
  window.disqus_identifier = $thread.data('post-url');
  window.disqus_url = $thread.data('post-url');
  (function () {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  }());

});
