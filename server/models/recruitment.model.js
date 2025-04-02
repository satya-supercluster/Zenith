import mongoose from "mongoose";
const JuniorSchema = new mongoose.Schema(
  {
    name: {
        type:String,
        require:true,
        trim:true
    },
    email: {
        type:String,
        require:true
    },
    scholarNo: {
        type:String,
        require:true
    },
    branch: String,
    year: String,
    skills: String,
    portfolio: String,
    github: String,
    codeforces:String,
    codechef:String,
    leetcode:String,
    whyJoin: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Junior = mongoose.model("Junior", JuniorSchema);

export default Junior
