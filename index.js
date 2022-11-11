require('dotenv').config()
const tasks = require('./tasks')

const main = async () => {
  console.log(process.env)

  tasks.init()
}

main()
  .then(() => console.log('finish'))
  .catch(console.error)
