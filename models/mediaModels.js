import mongoose from "mongoose";

const mediaModel = new mongoose.Schema(
  {
    userId:{type:mongoose.Schema.ObjectId, ref:"Users"},
    fileName:{type:String, required:true, unique:true},
    originalSize:{type: Number, required:true},
    compressedSize:{type:Number, required:true},
    savingpercent:{type:Number, required:true},
    url: { type: String, unique: true, required: true, lowercase: true },
  },
  { timestamps: true },
);

const CDNSchema =  mongoose.model("cdnModel", mediaModel);

export { CDNSchema };
