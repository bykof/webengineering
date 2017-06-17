const PARTY_MEMBER_JOINED = 'party_member_joined';
const PARTY_MEMBER_LEAVED = 'party_member_leaved';

export default class PartySocket {
  
  constructor(application_store) {
    this.application_store = application_store;
    
    this.socket = new WebSocket(
      'ws://127.0.0.1:8000/party/' +
      this.application_store.current_party.id +
      '/?party_member=' +
      JSON.stringify(this.application_store.current_member)
    );
    
    // Registry for callbacks
    this.defaultMessage = [];
    this.onPartyMemberJoined = [];
    this.onPartyMemberLeaved = [];
    
    this.onMessage = this.onMessage.bind(this);
    this.socket.onmessage = this.onMessage;
    if (this.socket.readyState === WebSocket.OPEN) this.socket.onopen();
  }
  
  onMessage(event) {
    let data = JSON.parse(event.data);
    switch (data.action) {
      case PARTY_MEMBER_JOINED:
        this.onPartyMemberJoined.forEach(
          (func) => {
            func(data);
          }
        );
        break;
      case PARTY_MEMBER_LEAVED:
        this.onPartyMemberLeaved.forEach(
          (func) => {
            func(data);
          }
        );
        break;
      default:
        this.defaultMessage.forEach(
          (func) => {
            func(data);
          }
        );
    }
  }
  
  close() {
    this.socket.close();
  }
  
  send(data) {
    this.socket.send(JSON.stringify(data));
  }
}