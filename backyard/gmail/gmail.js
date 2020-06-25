const { google } = require('googleapis');
const {
  SCOPES,
  EMAIL: SUBJECT,
  EMAIL_POST_LABEL_NAME: POST,
} = require('../constants');

const {
  parseBase64JSONStr,
} = require('../utils/str_utils');

class Gmail {
  async constructor() {
    this.setUp();
  }

  setUp() {
    const {
      client_email: email,
      private_key: key,
    } = parseBase64JSONStr(process.env.GMAIL_SECRET);

    const jwtClient = new google.auth.JWT({
      scopes: SCOPES,
      subject: SUBJECT,
      email,
      key,
    });

    this.gmailClient = google.gmail({
      version: 'v1',
      auth: jwtClient,
    });
  }

  async getPostLabelIDs() {
    if (this.labelIDs) {
      return this.labelIDs;
    }

    const { data } = await this.gmailClient.users.labels.list({
      userId: 'me',
    }, {
      headers: { 'Cache-Control': 'max-age=31536000' }
  });

    this.labelIDs = data.labels
      .filter(({ name }) => name === POST)
      .map(({ id }) => id);

    return this.labelIDs;
  }

  async listMessages() {
    const res = await this.gmailClient.users.messages.list({
      userId: 'me',
      labelIds: await this.getPostLabelIDs()
    });

    return res.data;
  }

  async getMessage(id) {
    const res = await this.gmailClient.users.messages.get({
      fields: ['payload'],
      userId: 'me',
      id
    });
    return res.data;
  }
}

module.exports = Gmail;
