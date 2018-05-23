const { google } = require('googleapis')

module.exports = {
  authenticate: (auth) => {
    return new Promise((resolve, reject) => {
      // authorize the teacher's account so we can make a form on their behalf
      const SCOPES = ['https://www.googleapis.com/auth/script.projects'];
      const TOKEN_PATH = 'credentials.json';

      const url = auth.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: SCOPES
      });
      console.log("URL IN CONTROLLER: ", url)
      resolve(url);
    })
  },
  create: (params, auth) => {
    console.log(params)
    return new Promise((resolve, reject) => {
      // map the incoming form body to the google form creators

      const script = google.script({version: 'v1', auth})
      let formCreator = script.projects.run({
        scriptId: process.env.FORM_SCRIPT,
        requestBody: {
            parameters: {
              teacherName: params.teacherName,
              students: params.class, // we actually need to have the teacher enter everyones name under a class and then when they select that class we populate this students param with everyones name
              assignmentName: params.assignmentName,
              question: params.question
            }
        }
      }, (err, { data }) => {
        resolve(data)
      })
    })
  }
}
