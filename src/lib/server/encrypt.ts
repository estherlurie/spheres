import bcrypt from "bcrypt";

type CallbackFunction = (hashedPassword: string) => Promise<void>;

const encryptPassword = async (
  username: string,
  password: string,
  callback: CallbackFunction
): Promise<void> => {
  return await bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log("encryptPassword: Error hashing: " + err);
    } else {
      await callback(hash);
    }
  });
};

export { encryptPassword };
