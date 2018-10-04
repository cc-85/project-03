class Flash {
  static _message = null;
  static setMessage(type, message) {
    this._messages = this._message || {};
    this._messages[type] = message;
  }

  static getMessages() {
    return this._messages;
  }

  static clearMessages() {
    this._messages = null;
  }
}

export default Flash;
