import bcrypt from "bcrypt"

const encryptedPassword = async (PlainPasssword)=>{
   const saltrounds = 10;
   const encryptedPassword = await bcrypt.hash(PlainPasssword,saltrounds);
  return encryptedPassword;
}

const matchPassword= async(userPassword,hashedPassword)=>{
  return bcrypt.compare(userPassword,hashedPassword);

}
export {encryptedPassword,matchPassword};