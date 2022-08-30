import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Document } from "mongoose";
import { Track } from "src/track/schemas/track.scema";

export type AlbumDocument = Album & Document

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop()
    author: string;

    @Prop()
    picture: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: "Track" })
    tracks: Track[];
}

export const AlbumScema = SchemaFactory.createForClass(Album)
