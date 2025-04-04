import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    isSuperAdmin:{
      type:Boolean,
      default:false
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin
