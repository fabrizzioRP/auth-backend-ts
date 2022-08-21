import { Schema, model, Model, Document } from "mongoose";

import HashGenerate from "../helpers/generate-password";

interface UserAttrs {
  name: string;
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "this field is obligatory"],
  },
  email: {
    type: String,
    require: [true, "this field is obligatory"],
  },
  password: {
    type: String,
    require: [true, "this field is obligatory"],
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const passHashed = await HashGenerate.toHash(this.get("password"));
    this.set("password", passHashed);
  }

  done();
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...credentials } = this.toObject();
  credentials.id = _id;
  return credentials;
};

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export default User;
