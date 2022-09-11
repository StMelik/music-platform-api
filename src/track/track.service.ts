import { Injectable } from "@nestjs/common";
import { Track, TrackDocument } from "./schemas/track.scema";
import { Model, ObjectId } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from "./schemas/comment.scema";
import { CreateTrackDto } from "src/dto/create-track.dto";
import { CreateCommentDto } from "src/dto/create-comment.dto";
import { FileService, FileType } from "src/file/file.service";


@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private comentModel: Model<CommentDocument>,
        private fileService: FileService
    ) { }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.trackModel.create({ ...dto, listens: 0, audio: audioPath, picture: picturePath })
        return track
    }

    async getAll(count = 10, offset = 0): Promise<{ total: number, tracks: Track[] }> {
        const total = await this.trackModel.find().count()
        const tracks = await this.trackModel.find().skip(offset).limit(count);
        return { total, tracks };
    }

    async search(query: string): Promise<{ tracks: Track[] }> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') }
        });
        return { tracks };
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments')
        return track;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id)
        return track._id
    }

    async addComent(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.comentModel.create({ ...dto })
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listens++
        track.save()
    }

}