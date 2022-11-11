const { ToadScheduler } = require('toad-scheduler')
const taskNotifyTime = require('./taskNotifyTime')

const init = () => {
  const scheduler = new ToadScheduler()

  const taskName = process.env.taskName
  console.log(taskName, '------------------------------')

  if (taskName === taskNotifyTime.name) {
    taskNotifyTime.init()
    scheduler.addSimpleIntervalJob(taskNotifyTime.task)
  }
}

module.exports = {
  init,
}
