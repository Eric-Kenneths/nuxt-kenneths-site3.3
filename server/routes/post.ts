
import RSS from 'rss';

export default defineEventHandler(async (event) => {

  //https://www.npmjs.com/package/rss  //documentation for RSS feed generator npm package
  //npm install rss
  //https://dev.to/rafaelmagalhaes/creating-rss-feed-with-nuxt-3-5oj  //example in nuxt 3

  // wrap everything in a try catch block
  try {
   

    const url = 'https://api.kenneths.com/api/khsds/feed-content';

    let posts = [];

    await fetch(url)
    .then(response => response.json())
    .then(function (data) {
      posts = data;
    })
    .catch(function (e) {

    })
    .finally(function () {
      //Maybe do something
    })

    // create new rss feed this will be our channel tag with website title and url
    const feed = new RSS({
      title: 'Kenneth\s Hair Salons And Day Spas',
      description: 'Information about Beauty Industry and Kenneth\'s Hair Salons And Day Spas',
      site_url: 'https://kenneths.com', // link to your website/blog
      feed_url: 'https://kenneths.com/feed', // path to your rss feed
      //image_url: 'https://kenneths.com/logo.webp',
      custom_namespaces: {
        'media': 'http://search.yahoo.com/mrss/'
      }
    });
    // loop over each posts
    for (const post of posts) {
      // add item tag to our rss feed with correct data
      if (post.photoName !== '') {
        feed.item({
          title: post.title, // title from post to item title
          url: `https://kenneths.com/${post.routeName}`, // full path to where our article is hosted
          description: `<img src="https://kenneths.com/static/blog/${post.photoName}" />` + post.subTitle + '...', // dev.to APIs doesn't return a description, if you have one you can add it here
          date: post.publishDate, // date post was created
        });
      } else {
        feed.item({
          title: post.title, // title from post to item title
          url: `https://kenneths.com/${post.routeName}`, // full path to where our article is hosted
          description: post.subTitle + '...', // dev.to APIs doesn't return a description, if you have one you can add it here
          date: post.publishDate, // date post was created
        });
      }

    }
    const feedString = feed.xml({ indent: true }); //This returns the XML as a string.

    event.node.res.setHeader('content-type', 'text/xml'); // we need to tell nitro to return this as a xml file
    event.node.res.end(feedString); // send the HTTP response
  } catch (e) {
    // return an error
    return e;
  }
});