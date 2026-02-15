import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoShema = new mongoose.Schema(
  {
    videoFile: {
      type: String, //Cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, //Cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String, //Cloudinary url
      required: true,
    },
    views: {
      type: Number,
      default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref: "userModel"
    }
  },

  {
    timestamps:true
  }
);

videoShema.plugin(mongooseAggregatePaginate)

export const videoModel = mongoose.model("Video", videoShema);
