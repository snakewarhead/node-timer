const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler')
const emailSend = require('../lib/emailSend')
const lib = require('../lib')

const name = 'taskNotifyTime'
const taskInterval = { seconds: 5 }
const options = { preventOverrun: true }

// {val: 5, unit: minute}
const intervals = []

const init = () => {
  const ts = process.env.timeInterval.split(',').map((i) => Number(i))
  console.log(ts)

  ts.forEach((i) => {
    const h = Math.floor(i / 3600)
    if (h > 0) {
      intervals.push({ val: h, unit: 'hour' })
      return
    }

    const m = Math.floor(i / 60)
    if (m > 0) {
      intervals.push({ val: m, unit: 'minute' })
      return
    }
  })

  console.log(intervals)
}

let lastHour
let lastMinute

const taskAction = new AsyncTask('notify time', async () => {
  const now = new Date()
  const nowHour = now.getHours()
  const nowMinute = now.getMinutes()

  const nowStr = `${nowHour}:${nowMinute}:${now.getSeconds()}`
  console.log(nowStr)

  let e
  intervals.forEach((i) => {
    if (i.unit === 'minute') {
      if (nowMinute === lastMinute) {
        return
      }
      if (nowMinute % i.val === 0) {
        e = i
      }
    } else if (i.unit === 'hour') {
      if (nowHour === lastHour) {
        return
      }
      if (nowHour % i.val === 0 && nowMinute === 0) {
        e = i
      }
    }
  })

  if (!e) {
    return
  }
  console.log(e)

  lastMinute = nowMinute
  lastHour = nowHour

  await emailSend.send(name, `${nowStr} - ${e}`)
})

const task = new SimpleIntervalJob(taskInterval, taskAction, options)

module.exports = {
  name,
  init,
  task,
}
