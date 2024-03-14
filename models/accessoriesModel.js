import mongoose from "mongoose";
import slugify from "slugify";

const accessoriesModelSchema = new mongoose.Schema(
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
      category:{
        type:String,
        required:true
      },
      brand:{
        type:String,
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
    slug: {
        type: String,
        unique: true,
      },
  },
  { timestamps: true }
);

accessoriesModelSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });
  

const accessoriesSchema = mongoose.model("accessoriesSchema", accessoriesModelSchema);

export default accessoriesSchema;
