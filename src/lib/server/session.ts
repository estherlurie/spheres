import jwt from 'jsonwebtoken';

class Session {
  username: string = "";
  createdAt: Date = new Date();
  signedToken: string = "";
}

const getSecret = () => {
  return process.env.JWT_SECRET;
};

const signToken = (token: string) => {
  let secret = getSecret();
  return jwt.sign(token, secret);
}

export function fetchSession(username: string, token: string): Session {
  console.log("createSession for " + username);
  let signedToken = signToken(token);
  return {
    username: username,
    createdAt: new Date(),
    signedToken: signedToken

  };
};

