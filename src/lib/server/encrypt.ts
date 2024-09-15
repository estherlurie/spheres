import bcrypt from 'bcrypt';

const encryptPassword = async (username: string, password: string, callback: Function) => {
  return await bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log("Error hashing: " + err);
      return err;
    }
    await callback(hash);
  });
};

export { encryptPassword };

