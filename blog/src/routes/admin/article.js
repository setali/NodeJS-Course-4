import express from 'express'
import ArticleController from '../../controllers/admin/article'

const router = express.Router()

router.get('/', ArticleController.list)
// router.get('/:id([0-9]+)', ArticleController.get)
router.get('/:id(\\d+)', ArticleController.get)
router.get('/create', ArticleController.create)
router.post('/', ArticleController.add)
router.get('/:id(\\d+)/edit', ArticleController.edit)
router.put('/:id(\\d+)', ArticleController.update)
router.delete('/:id(\\d+)', ArticleController.remove)

export default router

// Article
// list   => /article?title=salam        GET
// get    => /article/:id    GET
// create => /article        POST
// update => /article/:id    PUT
// patch  => /article/:id    PATCH
// delete => /article/:id    DELETE
