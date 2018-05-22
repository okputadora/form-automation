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
      const script = google.script({version: 'v1', auth})
      let form = script.
      resolve(form.getEditUrl())
    })    

  }
}