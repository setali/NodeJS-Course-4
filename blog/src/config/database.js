import { Model, Sequelize } from 'sequelize'

export * from 'sequelize'

export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'DEVELOPMENT' ? logQueries : false
})

function logQueries (query) {
  console.log(`Database query ===> ${query}`)
}

export class BaseModel extends Model {
  static find (id) {
    return this.findByPk(id)
  }

  remove () {
    return this.destroy()
  }
}
