import {WEBSOCKET_HOST} from "../config";
const PARTY_MEMBER_JOINED = 'party_member_joined';
const PARTY_MEMBER_LEAVED = 'party_member_leaved';
const PARTY_STARTED = 'party_started';
const PARTY_STOPPED = 'party_stopped';
const GAME_STARTS = 'game_starts';

export default class PartySocket {
  
  constructor(application_store) {
    this.application_store = application_store;
    
    this.socket = new WebSocket(
      WEBSOCKET_HOST +'/party/' +
      this.application_store.current_party.id +
      '/?party_member=' +
      JSON.stringify(this.application_store.current_member)
    );
    
    // Registry for callbacks
    this.clearCallbacks();
    
    this.onMessage = this.onMessage.bind(this);
    this.clearCallbacks = this.clearCallbacks.bind(this);
    this.socket.onmessage = this.onMessage;
    if (this.socket.readyState === WebSocket.OPEN) this.socket.onopen();
  }
  
  clearCallbacks() {
    this.onDefaultMessage = [];
    this.onPartyMemberJoined = [];
    this.onPartyMemberLeaved = [];
    this.onPartyStarted = [];
    this.onPartyStopped = [];
    this.onGameStarts = [];
  }
  
  runCallback(callback, data) {
    callback.forEach(
      (func) => {
        func(data);
      }
    );
  }
  
  onMessage(event) {
    let data = JSON.parse(event.data);
    switch (data.action) {
      case PARTY_MEMBER_JOINED:
        this.runCallback(this.onPartyMemberJoined, data);
        break;
      case PARTY_MEMBER_LEAVED:
        this.runCallback(this.onPartyMemberLeaved, data);
        break;
      case PARTY_STARTED:
        this.runCallback(this.onPartyStarted, data);
        break;
      case PARTY_STOPPED:
        this.runCallback(this.onPartyStopped, data);
        break;
      case GAME_STARTS:
        this.runCallback(this.onGameStarts, data);
        break;
      default:
        this.runCallback(this.onDefaultMessage, data);
    }
  }
  
  close() {
    this.socket.close();
  }
  
  send(data) {
    this.socket.send(JSON.stringify(data));
  }
}