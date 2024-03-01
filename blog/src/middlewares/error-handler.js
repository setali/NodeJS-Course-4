export default (err, req, res, next) => {
  const status = err.status || 500
  let title, content

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    title = err.message
    content = err.stack
  } else {
    title = 'Server Error'
    content = 'Server Error, Please call to admin'
  }

  res.status(status).render('error', {
    title,
    content
  })
}
