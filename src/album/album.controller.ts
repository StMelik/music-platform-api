import { CreateAlbumDto } from './../dto/create-album.dto';
import { ObjectId } from 'mongoose';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { TrackAlbum } from 'src/dto/track-album.dto';



@Controller('/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Get()
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number,
    ) {
        return this.albumService.getAll(count, offset)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('picture'))
    create(@UploadedFile() file, @Body() dto: CreateAlbumDto) {
        return this.albumService.create(dto, file)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }

    @Post(':id')
    addTrack(@Param('id') id: ObjectId, @Body() dto: TrackAlbum) {
        return this.albumService.addTrack(id, dto)
    }

    @Put(':id')
    deleteTrack(@Param('id') id: ObjectId, @Body() dto: TrackAlbum) {
        return this.albumService.deleteTrack(id, dto)
    }
}
