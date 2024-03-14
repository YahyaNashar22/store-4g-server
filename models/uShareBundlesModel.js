import mongoose from "mongoose";
import slugify from "slugify";

const uShareBundlesModelShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
        type: String,
        unique: true,
      },
  },
  { timestamps: true }
);

uShareBundlesModelShema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });
  

const uShareBundlesSchema = mongoose.model("uShareBundlesSchema", uShareBundlesModelShema);

export default uShareBundlesSchema;
