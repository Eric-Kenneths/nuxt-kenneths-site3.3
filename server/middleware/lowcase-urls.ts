// server/middleware/lowercase-urls.ts
export default eventHandler((event) => {
  const url = event.node.req.url;
  if (!url) return;

  const queryIndex = url.indexOf('?');
  const path = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const query = queryIndex === -1 ? '' : url.slice(queryIndex);

  if (path !== path.toLowerCase()) {
    return sendRedirect(event, path.toLowerCase() + query, 301);
  }
});
