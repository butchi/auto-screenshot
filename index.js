const screenshot = require('desktop-screenshot')
const { DateTime } = require('luxon')

require('dotenv').config()
const { SAVE_DIR, DURATION_MIN, TIME_FORMAT } = process.env

const intv = setInterval(_ => {
  const fileName = DateTime.local().toFormat(TIME_FORMAT)

  screenshot(`${SAVE_DIR}${fileName}.png`, (error, _complete) => {
    if (error) {
      console.log("Screenshot failed", error)
    } else {
      console.log('saved: ' + fileName)
    }
  })
}, DURATION_MIN * 60 * 1000)
