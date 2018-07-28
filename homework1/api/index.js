import http from 'http'
import url from 'url'

import {StringDecoder} from 'string_decoder'

const httpPort = '8800'
const httpsPort = '4433'

const server = http.createServer((req,res)=> {
  const data = {}
  let buf = ''
  const decoder = new StringDecoder('utf-8')
  const pathname = url.parse(req.url, true).pathname

  console.log('pathname:', pathname)
  const handler = (router[pathname] != null) ? router[pathname]: notfound;

  req.on('data', (data)=> {
    buf += decoder.write(data)
  })
  req.on('end', ()=>{
    buf += decoder.end()
    handler(buf, (status, result) => {
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(status)
      res.end(JSON.stringify({result}))
    })
  })

})

server.listen(httpPort, ()=>{
  console.log('Server starts listening to port:', httpPort )
})

const notfound = (data, cb) => {
  cb(404, 'Not found')
}

const router = {
  '/hello': (data, cb) => cb(200, 'Welcome World')
}
