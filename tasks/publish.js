//#NODE 11//

const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const emoji = require('node-emoji')
const colors = require('colors')

const browsers = ["chrome", "firefox"]
const directoryName = 'dist'
const fileName = `PE-Center-${+new Date()}`

const messageOk = `${emoji.get('package')}  Zip file ready to be published on ${colors.blue.underline(
    'https://chrome.google.com/u/1/webstore/devconsole && https://addons.mozilla.org/fr/developers/addons'
)} !`
const messageNotOk = `${emoji.get('rotating_light')}  ${colors.red('An error occured while zipping files !')} ${emoji.get('rotating_light')}`

const pathDir = path.join(__dirname, '..', `/${directoryName}`)

async function removeFiles(directory) {
    await fs.readdir(directory, async (err, files) => {
        if (err) throw err
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err
            })
        }
    })
}



(async () => {
  try {
    if (!fs.existsSync(pathDir)) {
      await new Promise(resolve => fs.mkdir(pathDir, resolve))
    }
    await removeFiles(directoryName)
    for (const browser of browsers) {
      const zip = new AdmZip()
      if (!fs.existsSync(path.resolve('build', browser))) {
        throw new Error(`Build directory or ${browser} directory does not exist, please run 'npm build'.`)
      }
      zip.addLocalFolder(`./build/${browser}/`, '')
      zip.writeZip(path.resolve(directoryName, `${fileName}-${browser}.zip`))
    }
    console.log(messageOk)
  } catch (error) {
    console.log(messageNotOk)
    console.log(`${colors.red('------------')}`)
    console.log(`${colors.red(error)}`)
    console.log(`${colors.red('------------')}`)
  }
})()
