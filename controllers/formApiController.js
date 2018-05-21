const { google } = require('googleapis')


// how would we get this form to others? the docs will probably tell us

module.exports = {
  authenticate: () => {
    return new Promise((resolve, reject) => {
      // authorize the teacher's account so we can make a form on their behalf
      const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "http://localhost:3000/form",
        process.env.API_KEY,
      );
  
      const SCOPES = ['https://www.googleapis.com/auth/script.projects'];
      const TOKEN_PATH = 'credentials.json';
  
      const url = oAuth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: SCOPES
      });
      console.log("URL IN CONTROLLER: ", url)
      resolve(url);
    })
  },
  create: (params) => {

  }
}