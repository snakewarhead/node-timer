const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler')
const emailSend = require('../lib/emailSend')
const lib = require('../lib')

const name = 'taskNotifyTime'
const taskInterval = { seconds: 5 }
const options = { preventOverrun: true }

const init = () => {
  const intervals = process.env.timeInterval.split(',').map((i) => Number(i))
  console.log(intervals)


}

const taskAction = new AsyncTask('notify time', async () => {})

const task = new SimpleIntervalJob(taskInterval, taskAction, options)

module.exports = {
  name,
  init,
  task,
}
