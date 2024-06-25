import jwt from 'jsonwebtoken';

class Session {
  username: string = "";
  createdAt: Date = new Date();

  constructor(username: string) {
    this.username = username;
  }
}


const getSecret = () => {
  return process.env.JWT_SECRET;
};

const signSession = (session: Session) => {
  let secret = getSecret();
  return jwt.sign(session, secret);
}

export function fetchSession(username: string): Session {
  console.log("createSession for " + username);
  let session = new Session(username);
  let signedSession = signSession(session);
  return signedSession;
};

