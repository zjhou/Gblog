module.exports = {
  SCOPES: ['https://www.googleapis.com/auth/gmail.readonly'],
  EMAIL: 'z@zjh.im',
  OK_STATUS: '200',
  EMAIL_DATA_PATH: {
    CONTENT: 'payload.parts[0].body.data',
    SUBJECT: 'payload.headers[3].value',
  },
  EMAIL_POST_LABEL_NAME: 'post',
};
