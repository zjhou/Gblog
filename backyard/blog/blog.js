const { get } = require('lodash');
const Gmail = require('../gmail');
const {
  parseBase64,
} = require('../utils/str_utils');

const {
  EMAIL_DATA_PATH
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
        title: get(message, EMAIL_DATA_PATH.SUBJECT, ''),
        content: parseBase64(get(message, EMAIL_DATA_PATH.CONTENT, ''))
      }
    });
  }
}

module.exports = Blog;
