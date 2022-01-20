const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const base = path.join(__dirname, 'temp')

const getContent = () => `
  \n\r${process.argv[2] ?? ''}
`

async function start () {
  try {
    if (!fsSync.existsSync(base)) {
      await fs.mkdir(base)
      console.log('The folder created')
    } 
    await fs.appendFile(path.join(base, 'logs.txt'), getContent())
    const data = await fs.readFile(path.join(base, 'logs.txt'), {encoding: 'utf8'})
    console.log(data)
  } catch (err) {
    console.log('err', err)
  }
}

start()

// fs.mkdir(base).then(() => {
//   console.log('The folder created')
// }).catch(err => console.log('err', err))