import PartySocket from "../sockets/PartySocket";

export default class ApplicationStore {
  constructor() {
    this.current_party = null;
    this.current_member = null;
    this.party_socket = null;
  }
  
  create_party_socket() {
    this.party_socket = new PartySocket(this);
    return this.party_socket;
  }
}