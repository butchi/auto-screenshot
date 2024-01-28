import screenshot from 'desktop-screenshot'
import { DateTime } from 'luxon'

const { SAVE_DIR, DURATION_MIN, TIME_FORMAT } = process.env
import dotenv from 'dotenv'

const intv = setInterval(_ => {
dotenv.config()
const handler = _ => setInterval(_ => {
  const fileName = DateTime.local().toFormat(TIME_FORMAT)

  screenshot(`${SAVE_DIR}${fileName}.png`, (error, _complete) => {
    if (error) {
      console.log("Screenshot failed", error)
    } else {
      console.log('saved: ' + fileName)
    }
  })
}, DURATION_MIN * 60 * 1000)

handler()
