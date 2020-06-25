const { get } = require('lodash');
const Gmail = require('../gmail');
const {
  parseBase64,
} = require('../utils/str_utils');

const {
  EMAIL_DATA_PATH,
  EMAIL_SUBJECT,
} = require('../constants');

class Blog extends Gmail {
  async getPosts() {
    const { messages } = await this.listMessages();

    const fullMessages = await Promise.all(
      messages
      .map(({id}) => this.getMessage(id))
    );

    return fullMessages.map(message => {
      return {
        title: this.findMsgSubject(message),
        content: parseBase64(get(message, EMAIL_DATA_PATH.CONTENT, ''))
      }
    });
  }

  findMsgSubject = (message) => {
    const header = message.payload.headers.find(({ name }) => {
      return name === EMAIL_SUBJECT;
    });

    return header.value;
  }
}

module.exports = Blog;
