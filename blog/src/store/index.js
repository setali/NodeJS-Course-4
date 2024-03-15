import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
})

connection.connect()

function query (q) {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id

    this.fieldNames.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get fieldNames () {
    return this.constructor.fields.map(field => field.name)
  }

  get entityName () {
    return this.constructor.entityName
  }

  save () {
    const q = this.id
      ? `UPDATE ${this.entityName} SET ${this.fieldNames
          .map(
            name =>
              `${name} = ${
                this[name] === undefined ? 'NULL' : `'${this[name]}'`
              }`
          )
          .join(', ')} WHERE id = ${this.id}`
      : `INSERT INTO ${this.entityName} (${this.fieldNames.join(
          ', '
        )}) VALUES (${this.fieldNames
          .map(name => (this[name] === undefined ? 'NULL' : `'${this[name]}'`))
          .join(', ')})`

    query(q)
  }

  static findAll () {
    return query(`SELECT * FROM ${this.entityName}`)
  }

  static async find (id) {
    const data = await query(
      `SELECT * FROM ${this.entityName} WHERE id = ${id}`
    )

    return data[0] ? new this(data[0]) : undefined
  }

  static remove (id) {
    return query(`DELETE FROM ${this.entityName} WHERE id = ${id}`)
  }

  remove () {
    if (this.id) {
      return this.constructor.remove(this.id)
    }
  }
}

export function init (Entity) {
  const { entityName, fields } = Entity

  if (!entityName) {
    throw new Error('Entity needs entityName static property')
  }

  query(`SHOW TABLES LIKE '${entityName}'`).then(result => {
    if (result.length === 0) {
      query(`CREATE TABLE IF NOT EXISTS ${entityName} 
      (id INT NOT NULL AUTO_INCREMENT, 
      ${fields
        .map(
          field =>
            `${field.name} ${field.type} ${field.nullable ? '' : 'NOT NULL'}`
        )
        .join(', ')}  
          , PRIMARY KEY (id)
        )
      `).then(() => console.log(`Table ${entityName} created`))
    }
  })

  return Entity
}
