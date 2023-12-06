import mongoose from "mongoose";

const TeamModel = mongoose.Schema(
  {
    TeamData: [ { type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true },{ _id: false, strict: false }
);
export default mongoose.model("Team", TeamModel);
