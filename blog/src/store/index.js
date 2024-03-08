import fs from 'fs'
import path from 'path'
import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3304,
  user: 'root',
  password: '123456',
  database: 'blog'
})

connection.connect()

function query (q) {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

query('CREATE TABLE ali (id int)').then(console.log).catch(console.log)

export class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id

    this.fields.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get entityName () {
    return this.constructor.entityName
  }

  static get data () {
    return getData(this.entityName)
  }

  get data () {
    return this.constructor.data
  }

  static set data (content) {
    saveData(this.entityName, content)
  }

  set data (content) {
    this.constructor.data = content
  }

  save () {
    const data = this.data

    if (this.id) {
      const entity = data.find(el => el.id === this.id)
      this.fields.forEach(field => {
        entity[field] = this[field]
      })
    } else {
      const entity = { id: Date.now() }

      this.fields.forEach(field => {
        entity[field] = this[field]
      })

      data.push(entity)
    }

    this.data = data
  }

  static findAll () {
    return this.data
  }

  static find (id) {
    const data = this.data.find(el => el.id === id)

    return data ? new this(data) : undefined
  }

  static remove (id) {
    const data = this.data

    const dataIndex = data.findIndex(el => el.id === id)

    if (dataIndex >= 0) {
      data.splice(dataIndex, 1)
      this.data = data
    }
  }

  remove () {
    if (this.id) {
      this.constructor.remove(this.id)
    }
  }
}

function getFilePath (entityName) {
  return path.resolve(__dirname, `${entityName}.data`)
}

function getData (entityName) {
  const filePath = getFilePath(entityName)
  const data = fs.readFileSync(filePath, 'utf-8')

  return data ? JSON.parse(data) : []
}

function saveData (entityName, data) {
  const filePath = getFilePath(entityName)
  fs.writeFileSync(filePath, JSON.stringify(data))
}

export function init (Entity) {
  if (!Entity.entityName) {
    throw new Error('Entity needs entityName static property')
  }

  const filePath = getFilePath(Entity.entityName)

  if (!fs.existsSync(filePath)) {
    saveData(Entity.entityName, [])
  }

  return Entity
}
