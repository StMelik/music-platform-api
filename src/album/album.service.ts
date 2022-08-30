import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { TrackAlbum } from "src/dto/track-album.dto";
import { CreateAlbumDto } from "src/dto/create-album.dto";
import { FileService, FileType } from "src/file/file.service";
import { Track, TrackDocument } from "src/track/schemas/track.scema";
import { Album, AlbumDocument } from "./album.scema";

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private fileService: FileService
    ) { }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        const albums = await this.albumModel.find().skip(offset).limit(count)
        return albums;
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id).populate('tracks')
        return album
    }

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.ALBUM, picture)
        const album = await this.albumModel.create({ ...dto, picture: picturePath })
        return album
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.albumModel.findByIdAndDelete(id)
        return album._id
    }

    async addTrack(id: ObjectId, dto: TrackAlbum): Promise<Album> {
        const album = await this.albumModel.findByIdAndUpdate(id,
            { $push: { tracks: dto.trackId } },
            { new: true }
        )
        return album
    }

    async deleteTrack(id: ObjectId, dto: TrackAlbum): Promise<Album> {
        const album = await this.albumModel.findByIdAndUpdate(id,
            { $pull: { tracks: dto.trackId } },
            { new: true }
        )
        return album
    }
}
