import screenshot from 'screenshot-desktop'
import sharp from 'sharp'
import { DateTime } from 'luxon'

import dotenv from 'dotenv'

dotenv.config()
const { SAVE_DIR, TIME_FORMAT } = process.env

const handler = async _ => {
    const saveDir = SAVE_DIR.replace(/[\/\\]$/, '')

    let millisecond

    millisecond = 60 * 1000

    // stream thumbnail screenshot
    setInterval(_ => {
        const dateNow = DateTime.local()
        const fileName = dateNow.toFormat(TIME_FORMAT)
        const streamImgPath = `${saveDir}/stream/${fileName}.jpg`

        screenshot()
            .then(img => {
                sharp(img)
                    .resize({ height: 720 })
                    .jpeg({ quality: 65 })
                    .toFile(streamImgPath, (err, info) => {
                        if (err) {
                            console.log('Screenshot failed', err)
                        } else {
                            console.log('Saved: ' + streamImgPath)
                        }

                        // if (info) {
                        //     console.info('Screenshot info', info)
                        // }
                    })
            })
            .catch(err => {
                console.log('Screenshot failed', err)
            })
    }, millisecond)

    millisecond = 15 * 60 * 1000

    // full image screenshot
    setInterval(_ => {
        const dateNow = DateTime.local()
        const fileName = dateNow.toFormat(TIME_FORMAT)
        const fullImgPath = `${saveDir}/${fileName}.png`
        const nextTime = dateNow.plus({ millisecond })

        screenshot()
            .then(img => {
                sharp(img).toFile(fullImgPath, (err, info) => {
                    if (err) {
                        console.log('Screenshot failed', err)
                    } else {
                        console.log('Saved: ' + fullImgPath)
                    }

                    // if (info) {
                    //     console.info('Screenshot info', info)
                    // }

                    console.log('Next: ' + nextTime.toFormat('HH:mm:ss'))
                })
            })
            .catch(err => {
                console.log('Screenshot failed', err)
            })
    }, millisecond)
}

handler()
