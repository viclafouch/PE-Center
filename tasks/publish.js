const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const emoji = require('node-emoji')
const colors = require('colors')

const directoryName = 'dist'
const fileName = `PE-Center-${+new Date()}.zip`
const zip = new AdmZip()

const messageOk = `${emoji.get('package')}  Zip file ready to be published on ${colors.blue.underline(
    'https://chrome.google.com/u/1/webstore/devconsole'
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

    if (!fs.existsSync(path.resolve('build'))) {
      throw new Error('Build directory does not exist, please run `npm build`.')
    }
    fs.existsSync(pathDir) || fs.mkdirSync(pathDir)
    await removeFiles(directoryName)
    zip.addLocalFolder('./build/', '')
    zip.writeZip(path.resolve(directoryName, fileName))
    console.log(messageOk)
  } catch (error) {
    console.log(messageNotOk)
    console.log(`${colors.red('------------')}`)
    console.log(`${colors.red(error)}`)
    console.log(`${colors.red('------------')}`)
  }
})()
