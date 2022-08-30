import { FileService } from './../file/file.service';
import { AlbumController } from './album.controller';
import { Album, AlbumScema } from './album.scema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { AlbumService } from './album.service';
import { Track, TrackSchema } from 'src/track/schemas/track.scema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumScema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService],
})

export class AlbumModule { }
