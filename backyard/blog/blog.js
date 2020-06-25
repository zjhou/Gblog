const { get } = require('lodash');
const Gmail = require('../gmail');
const {
  parseBase64,
} = require('../utils/str_utils');

const {
  EMAIL_DATA_PATH,
  EMAIL_SUBJECT,
  EMAIL_RICH_MIME_TYPE,
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
        content: this.findMsgContent(message),
      }
    });
  }

  findMsgSubject = (message) => {
    const header = message.payload.headers.find(({ name }) => {
      return name === EMAIL_SUBJECT;
    });

    return header.value;
  };

  findMsgContent = (message) => {
    const part = message.payload.parts.find(function(part) {
      return part.mimeType === EMAIL_RICH_MIME_TYPE;
    });

    return parseBase64(part.body.data)
  }
}

module.exports = Blog;
