import mongoose from "mongoose";
import slugify from "slugify";

const userModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email:{
      type :String ,
      unique :true ,
      required:true
    },
    role:{
        type :String ,
        required:true
    },
    slug: {
        type: String,
        unique: true,
      },
  },
  { timestamps: true }
);

userModelSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });
  

const userSchema = mongoose.model("userSchema", userModelSchema);

export default userSchema;
