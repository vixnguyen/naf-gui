const net = require('net')
const childProcess = require('child_process')

const port = process.env.PORT ? process.env.PORT - 100 : 2612

process.env.ELECTRON_START_URL = `http://127.0.0.1:${port}`

const client = new net.Socket()

let startedElectron = false
const tryConnection = () => {
  client.connect(
    { port },
    () => {
      client.end()
      if (!startedElectron) {
        startedElectron = true
        const exec = childProcess.exec
        exec('npm run electron')
      }
    }
  )
}


tryConnection()

client.on('error', (err) => {
  // console.log(err)
  setTimeout(tryConnection, 6000)
})
