import methodOverride from 'method-override'

export default methodOverride(function (req, res) {
  let method = req.method

  if (req.method === 'POST' && req.body?._method) {
    method = req.body._method
    delete req.body._method
  }

  return method
})
