import { BadRequestError, NotFoundError } from '../../utils/errors'
import BaseController from '../base'

const articles = []

class ArticleController extends BaseController {
  list (req, res) {
    res.render('admin/article/list', {
      title: 'Article list',
      articles
    })
  }

  get (req, res) {
    const { id } = req.params

    const article = articles.find(el => el.id === +id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('admin/article/show', {
      title: article.title,
      article
    })
  }

  create (req, res) {
    res.render('admin/article/create', {
      title: 'Create Article'
    })
  }

  add (req, res) {
    const { title, text } = req.body

    if (!title || !text) {
      throw new BadRequestError('Title and Text is required')
    }

    articles.push({ id: Date.now(), title, text })

    res.redirect('/admin/article')
  }

  edit (req, res) {
    const { id } = req.params

    const article = articles.find(el => el.id === +id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('admin/article/edit', {
      title: `Edit article ${article.title}`,
      article
    })
  }

  update (req, res) {
    const { title, text } = req.body

    if (!title || !text) {
      throw new BadRequestError('Title and Text is required')
    }

    const { id } = req.params

    const article = articles.find(el => el.id === +id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    article.title = title
    article.text = text

    res.redirect('/admin/article')
  }

  remove (req, res) {
    const { id } = req.params

    const articleIndex = articles.findIndex(el => el.id === +id)

    if (articleIndex === -1) {
      throw new NotFoundError('Article not found')
    }

    articles.splice(articleIndex, 1)

    res.redirect('/admin/article')
  }
}

export default new ArticleController()
