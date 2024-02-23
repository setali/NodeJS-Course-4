export function home (req, res) {
  res.render('index', {
    title: 'Home page',
    content: 'Welcome to NodeJS course'
  })
}

export function about (req, res) {
  res.render('about', {
    title: 'About us',
    content: 'My About us'
  })
}

export function contact (req, res) {
  res.render('contact', {
    title: 'Contact us',
    content: 'Please contact us'
  })
}
