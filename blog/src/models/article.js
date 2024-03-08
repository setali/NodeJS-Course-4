import { BaseModel, init } from '../store'

class Article extends BaseModel {
  static fields = ['title', 'text']

  static entityName = 'articles'
}

export default init(Article)
