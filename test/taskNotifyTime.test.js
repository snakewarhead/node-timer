describe('taskNotifyTime', () => {
  it('send email msg', () => {
    const nowStr = '14:36:4'
    const e = { val: 15, unit: 'minute' }
    console.log(`${nowStr} - ${e}`)
    console.log(`${nowStr} - ${JSON.stringify(e)}`)
    console.log(nowStr, '-', e)

    let enc = encodeURI(JSON.stringify(e))
    let dec = decodeURI(enc)
    console.log(enc, dec)
  })
})
