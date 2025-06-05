export default defineWebSocketHandler({
  open(peer) {
    peer.subscribe('chat')
  },

  message(peer, data) {
    const incomingMessage = typeof data === 'string' ? data : data.toString()

    peer.publish('chat', incomingMessage)
  },

  close(peer) {
    peer.unsubscribe('chat')
  },
})
