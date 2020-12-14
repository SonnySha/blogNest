/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import fire from "../fire"
import { BlogService } from '../blog/blog.service';

@Controller('blog-controller')
export class BlogControllerController {

    constructor(private readonly blogService: BlogService) { }


    @Post('/createArticle')
    postArticle(@Body() body): string {
        return this.blogService.createArticle(body.title, body.content)
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


    @Get('/readArticles')
    readArticles(): any {
        return this.blogService.getArticles();
    }


}
