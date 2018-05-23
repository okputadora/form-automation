const { google } = require('googleapis')

module.exports = {
  authenticate: (auth) => {
    return new Promise((resolve, reject) => {
      // authorize the teacher's account so we can make a form on their behalf
      const SCOPES = ['https://www.googleapis.com/auth/script.projects', 'https://www.googleapis.com/auth/forms', 'https://www.googleapis.com/auth/script.external_request'];
      const TOKEN_PATH = 'credentials.json';

      const url = auth.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: SCOPES
      });
      resolve(url);
    })
  },
  create: (params, auth) => {
    console.log(params)
    return new Promise((resolve, reject) => {
      // map the incoming form body to the google form creators
      const script = google.script({version: 'v1', auth})
      let formCreator = script.scripts.run({
        scriptId: process.env.FORM_SCRIPT,
        function: 'createForm',
        // data: [
        //   params.teacherName,
        //   params.class, // we actually need to have the teacher enter everyones name under a class and then when they select that class we populate this students param with everyones name
        //   params.assignmentName,
        //   params.question
        // ]
        // }
      }, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }
}
