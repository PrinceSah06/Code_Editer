import mongoose,{Document,Model,Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


interface IUser {
    email:string,
    password:string

}

interface IDoucument extends IUser, Document {
  comparePassword(candidate: string): Promise<boolean>;
  genrateAuthToken():string
}

interface IModel extends Model<IDoucument>{
    hashPassword(candidate:string):Promise<string>
    getToken(userId:string) :string
}



const userSchema = new  Schema <IDoucument,IModel>({
    email:{
        type:String,
        required:true,
        minLength:7
    },
    password:{
        type:String,
        required:true,
        minLength:5
    }
})

userSchema.statics.hashPassword =  async function(password : string) {

    if (!password) {
      throw new Error("Password is required");
    }
    const hashPassword =await bcrypt.hash(password,10)

    return hashPassword



}

userSchema.methods.comparePassword = async function (password: string):Promise<boolean> {
  if (!password) {
    throw new Error("Password is required");
  }
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch
};
userSchema.methods.genrateAuthToken =  function ():string {
  const token = jwt.sign({email:this.email,_id:this._id},process.env.JWT_SECRET as string || 'default secrate',{
    expiresIn:"24h"
  })

  return token
  
}
userSchema.pre<IDoucument>("save", async function (next) {
  if (!this.isModified("password")) {
    return ;
  }

  this.password = await bcrypt.hash(this.password, 10);
  ;
});



const User = mongoose.model<IDoucument,IModel>('User',userSchema)
export default  User