import Article from '../../models/article'
import { BadRequestError, NotFoundError } from '../../utils/errors'
import BaseController from '../base'

class ArticleController extends BaseController {
  list (req, res) {
    const articles = Article.findAll()

    res.render('admin/article/list', {
      title: 'Article list',
      articles
    })
  }

  get (req, res) {
    const { id } = req.params

    const article = Article.find(+id)

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

    const article = new Article({ title, text })

    article.save()

    res.redirect('/admin/article')
  }

  edit (req, res) {
    const { id } = req.params

    const article = Article.find(+id)

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

    const article = Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    article.title = title
    article.text = text

    article.save()

    res.redirect('/admin/article')
  }

  remove (req, res) {
    const { id } = req.params

    const article = Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    article.remove()

    res.redirect('/admin/article')
  }
}

export default new ArticleController()
