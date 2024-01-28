import screenshot from 'desktop-screenshot'
import { DateTime } from 'luxon'

import dotenv from 'dotenv'

dotenv.config()
const { SAVE_DIR, FILE_EXT, DURATION_MS, TIME_FORMAT } = process.env

const handler = _ => setInterval(_ => {
  const fileName = DateTime.local().toFormat(TIME_FORMAT)
  const saveDir = SAVE_DIR.replace(/[\/\\]$/, '')
  const filePath = `${saveDir}/${fileName}.${FILE_EXT}`

  screenshot(filePath, (error, _complete) => {
    if (error) {
      console.log('Screenshot failed', error)
    } else {
      console.log('saved: ' + filePath)
    }
  })
}, DURATION_MS)

handler()
