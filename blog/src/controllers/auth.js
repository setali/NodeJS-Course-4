import User from '../models/user'
import { BadRequestError } from '../utils/errors'
import BaseController from './base'
import bcrypt from 'bcrypt'

export class AuthController extends BaseController {
  loginPage (req, res) {
    if (req.user) {
      return res.redirect('/')
    }

    return res.render('auth/login', {
      title: 'Login'
    })
  }

  async login (req, res) {
    const { username, password } = req.body

    if (!username || !password) {
      throw new BadRequestError('username and password are required')
    }

    const user = await User.findOne({ where: { username } })

    if (!user) {
      throw new BadRequestError('Credential Error')
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError('Credential Error')
    }

    req.session.user = user

    res.redirect('/')
  }

  registerPage (req, res) {
    if (req.user) {
      return res.redirect('/')
    }

    res.render('auth/register', {
      title: 'Register'
    })
  }

  async register (req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      throw new BadRequestError('fields are required')
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 12)

      const user = await User.create({
        username,
        email,
        password: hashedPassword
      })

      res.json(user)
    } catch (err) {
      if (err.original.code === 'ER_DUP_ENTRY') {
        if (err.fields.username) {
          throw new BadRequestError('username is duplicate')
        } else if (err.fields.email) {
          throw new BadRequestError('Email is duplicate')
        }
      }
    }
  }

  logout (req, res) {
    req.session.destroy(error => {
      if (!error) {
        res.redirect(req.headers.referer)
      }
    })
  }
}

export default new AuthController()
