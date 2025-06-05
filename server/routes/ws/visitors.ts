export default defineWebSocketHandler({
  open(peer) {
    peer.subscribe('visitors')

    peer.publish('visitors', peer.peers.size)

    peer.send(peer.peers.size)
  },
  close(peer) {
    peer.unsubscribe('visitors')

    setTimeout(() => {
      peer.publish('visitors', peer.peers.size)
    }, 500)
  },
})
