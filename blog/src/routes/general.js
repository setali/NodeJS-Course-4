const express = require('express')
import { home, about, contact } from '../controllers/general'

const router = express.Router()

router.get('/', home)
router.get('/about', about)
router.get('/contact', contact)

export default router
