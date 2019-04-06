const mplex = require('libp2p-mplex')
const tcp = require('net')
const pull = require('pull-stream')
const toPull = require('stream-to-pull-stream')

const listener = tcp.createServer((socket) => {
    console.log('[listener] Got connection!')

    const muxer = mplex.listener(toPull(socket))

    muxer.on('stream', (stream) => {
        console.log('[listener] Got stream!')
        pull(
            stream,
            pull.drain((data) => {
                console.log('[listener] Received:')
                console.log(data.toString())
            })
        )
    })
})

listener.listen(9999, () => {
    console.log('[listener] listening on 9999')
})