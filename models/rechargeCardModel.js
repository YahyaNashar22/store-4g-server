import mongoose from "mongoose";
import slugify from "slugify";

const rechargeCardModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    picture: {
        type: String,
        required: true,
      },
      carrier:{
        type:String,
        required:true
      },
    slug: {
        type: String,
        unique: true,
      },
  },
  { timestamps: true }
);

rechargeCardModelSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });
  

const rechargeCardSchema = mongoose.model("rechargeCardSchema", rechargeCardModelSchema);

export default rechargeCardSchema;
