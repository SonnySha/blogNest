/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile, BadRequestException, Req } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import fire from "../fire"
import { BlogService } from '../blog/blog.service';

import { PostDTO } from '../blog/Post.DTO'
import { editFileName } from './editFileName';
import { imageFileFilter } from './imageFileFilter';
import { diskStorage } from 'multer';


@Controller('blog-controller')
export class BlogControllerController {

    constructor(private readonly blogService: BlogService) { }


    @Get('')
    async readArticles(): Promise<any> {
        return this.blogService.getArticles();
    }


    @Get('/session')
    findAll(@Req() request: Request) {
        return req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    }

    @Get('/error')
    async displayError(): Promise<any> {
        return new BadRequestException('test message erreur');
    }

    @Post('/createArticle')
    @UseInterceptors(
        FileInterceptor('picture', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    postArticle(@Body() post: PostDTO, @UploadedFile() file): string {
        console.log(file)
        post.picture = file.filename;
        return this.blogService.createArticle(post)
    }

    // @Post('/createArticle')
    // postArticle(@Body() body): string {
    //     return this.blogService.createArticle(body.title, body.content)
    // }

    // @Post('/upload')
    // @UseInterceptors(FileInterceptor('file', {
    //     dest: "./uploads",
    //     fileFilter: imageFileFilter,
    // }))
    // uploadImg(@UploadedFile() file) {
    //     console.log(file);
    //     console.log(file.extname(file.originalname));
    //     return file.filename
    // }

    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }


    @Post('/updateArticle/:idArticle')
    updateArticle(@Body() body, @Param('id') idArticle: string): string {
        return this.blogService.setArticle(idArticle, body.title, body.content)
    }


    @Get('/service')
    test(): string {
        return this.blogService.getBlog();
    }

    @Get('/removeArticle/:idArticle')
    removeArticle(@Param('id') idArticle: string): string {
        return this.blogService.removeArticle(idArticle);
    }






}
