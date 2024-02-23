const loadEnv = require('./loadEnv')

loadEnv.config('.env.development')

console.log(process.env.PORT)
