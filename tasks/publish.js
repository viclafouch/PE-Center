const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const browsers = require('../browsers')

const rootOutput = 'dist'
const entryOutput = 'build'
const zipFileName = `PE-Center-${+new Date()}.zip`
const zip = new AdmZip()

fs.existsSync(`./${rootOutput}`) || fs.mkdirSync(`./${rootOutput}`)

browsers.forEach(browser => {
  fs.existsSync(`./${rootOutput}/${browser}`) ||
    fs.mkdirSync(`./${rootOutput}/${browser}`)
})

async function removeFiles(directory) {
  await fs.readdir(directory, async (err, files) => {
    if (err) throw err
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) {
          throw err
        }
      })
    }
  })
}

async function publish() {
  try {
    console.info(`\x1b[1;32mPE-Center@${process.env.npm_package_version}\x1b[m`)
    browsers.forEach(async browser => {
      const entry = path.join(entryOutput, browser)
      const output = path.join(rootOutput, browser)
      if (!fs.existsSync(entry)) {
        throw new Error(
          `${browser} has no build directory, please run npm build.`
        )
      }

      await removeFiles(output)
      zip.addLocalFolder(entry, '')
      zip.writeZip(path.join(output, zipFileName))
      console.info(`\x1b[1;32m${browser} extension ready to be published\x1b[m`)
    })
  } catch (error) {
    console.error(error)
  }
}

publish()
