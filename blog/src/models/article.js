import fs from 'fs'
import path from 'path'

const articles = []

function getFilePath () {
  return path.resolve(__dirname, 'article.data')
}

function getData () {
  const filePath = getFilePath()
  const data = fs.readFileSync(filePath, 'utf-8')

  return data ? JSON.parse(data) : []
}

function saveData (data) {
  const filePath = getFilePath()
  fs.writeFileSync(filePath, JSON.stringify(data))
}

export default class Article {
  constructor ({ id, title, text }) {
    this.id = id
    this.title = title
    this.text = text
  }

  save () {
    const articles = getData()

    if (this.id) {
      const article = articles.find(el => el.id === this.id)
      article.title = this.title
      article.text = this.text
    } else {
      articles.push({
        id: Date.now(),
        title: this.title,
        text: this.text
      })
    }

    saveData(articles)
  }

  static findAll () {
    return getData()
  }

  static find (id) {
    const articles = getData()

    const article = articles.find(el => el.id === id)

    return article ? new Article(article) : undefined
  }

  static remove (id) {
    const articles = getData()

    const articleIndex = articles.findIndex(el => el.id === id)

    if (articleIndex >= 0) {
      articles.splice(articleIndex, 1)
      saveData(articles)
    }
  }

  remove () {
    if (this.id) {
      Article.remove(this.id)
    }
  }
}
