import axios from 'axios';

 const authSession = (app, callback) => {
  const authUrl = "http://117.139.217.11:10300/migunetsdk/auth/sendSession?ctype=" + app.ctype + "&netId=" + app.netId;
  const options = {
    url: authUrl,
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'authId': app.authId,
      'authSessionId': app.sessionId
    }
  };
  axios
    .request(options)
    .then(callback)
    .catch(err => console.log(err));
};
export default authSession;
