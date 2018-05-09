'use strict'

const child_process = require('child_process')
const path = require('path')

exports.handler = function(event, context, callback) {
  try {
    if (event.host == 'undefined' || !event.host) {
      return void callback(null, {
        statusCode: 400,
        body: {
          message: 'No host passed',
        }
      })
    }

    const nmap = path.resolve(__dirname, 'bin', 'nmap');
    const process = child_process.spawnSync(nmap, ['-Pn', event.host])

    return void callback(null, {
      statusCode: 200,
      body: {
        stdout: process.stdout.toString(),
        stderr: process.stderr.toString(),
        returncode: process.status.toString(),
      }
    })
  }
  catch (e) {
    callback(e);
  }
}
