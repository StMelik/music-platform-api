import { AlbumModule } from './album/album.module';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
        MongooseModule.forRoot('mongodb+srv://music-user-admin:music-password@cluster0.vig2olo.mongodb.net/?retryWrites=true&w=majority'),
        TrackModule,
        AlbumModule,
        FileModule,
    ],
})
export class AppModule { }