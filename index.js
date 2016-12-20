module.exports = exports = function (map) {
  const allowed_verbs = Object.keys(map).map(v => v.toUpperCase()).join(', ')

  return (req, res) => {
    res.setHeader('Access-Control-Request-Method', allowed_verbs)
    const {method} = req
    const fn = map[method.toLowerCase()]
    if (!fn) {
      res.writeHead(405)
      res.end('Method Not Allowed')
      return
    }
    return fn(req, res)
  }
}
