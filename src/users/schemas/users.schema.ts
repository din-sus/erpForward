import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";

@Schema()
export class User {
    @Prop()
    name: string

    @Prop()
    surname: string

    @Prop()
    birthDate: Date

    @Prop({unique: true})
    phoneNumber: string

    @Prop({unique: true})
    login: string

    @Prop()
    password: string

    @Prop({default: 'user'})
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User)