// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
// import * as bcrypt from "bcrypt";
// const saltRoundForPassword = 10;

// export type UserDocument = mongoose.HydratedDocument<User>;

// @Schema()
// export class User {
//   @Prop({ required: true, unique: true })
//   username: string;

//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true }) // todo on pre save salt
//   password: string;

//   @Prop({ required: true })
//   email: string;
// }
// const userSchema = SchemaFactory.createForClass(User);
// userSchema.pre<User>("save", async function (next) {
//   try {
//     const salt = bcrypt.genSaltSync(saltRoundForPassword);
//     this.password = bcrypt.hashSync(this.password, salt);
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

// export const UserSchema = userSchema;
