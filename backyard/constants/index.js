module.exports = {
  SCOPES: ['https://www.googleapis.com/auth/gmail.readonly'],
  EMAIL: 'm@zjh.im',
  OK_STATUS: '200',
  EMAIL_DATA_PATH: {
    CONTENT: 'payload.parts[0].body.data',
  },
  EMAIL_POST_LABEL_NAME: 'post',
  EMAIL_SUBJECT: 'Subject',
};
