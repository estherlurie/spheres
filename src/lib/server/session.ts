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
  return jwt.sign(session, getSecret(), { expiresIn: "1d" });
}

function fetchSession(username: string): Session {
  console.log("createSession for " + username);
  let session = new Session(username);
  let signedSession = signSession(session);
  return signedSession;
};

function validateSession(session: Session): Session {
  console.log("validateSession for " + session.username);
  return jwt.verify(session, getSecret());
}

export { Session, fetchSession, validateSession };
