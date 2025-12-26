import mongoose,{Schema} from "mongoose";

interface IProject{
    name:string
    owners:mongoose.Types.ObjectId[];
    language:string;
    code:string;
    createdAt:Date;
    updatedAt:Date;
}

const projectSchema = new Schema<IProject>({
    name:{
        type:String,
        required:true
    },
    owners:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    language:{
        type:String,
        required:true,
        default:'javascript'
    },
    code:{  type:String,
    required:true,
    default:'//start coding here'
},
},{
    timestamps:true
});

export const Project = mongoose.model<IProject>("Project",projectSchema);

