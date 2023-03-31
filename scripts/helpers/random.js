hexo.extend.generator.register('random', function (locals) {
  const config = hexo.config.random || {};
  const posts = [];
  for (const post of locals.posts.data) {
    if (post.random !== false) posts.push(post.path);
  }
  return {
    path: config.path || 'anzhiyu/random.js',
    data: `var posts=${JSON.stringify(
      posts
    )};function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};`,
  };
})