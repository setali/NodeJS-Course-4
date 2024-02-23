const dotEnv = require('dotenv')

dotEnv.config({ path: '.env.development' })

console.log(process.env.PORT)
