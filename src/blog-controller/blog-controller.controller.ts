/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import fire from "../fire"


import firebase from 'firebase';
import 'firebase/database';

const fire = firebase.initializeApp({
    apiKey: 'AIzaSyA1n4Iwq3ohbs8JJdacDsAcFfU0SpJqk-g',
    authDomain: 'blog-e410e.firebaseapp.com',
    databaseURL: 'https://blog-e410e-default-rtdb.firebaseio.com',
    projectId: 'blog-e410e',
    storageBucket: 'blog-e410e.appspot.com',
    messagingSenderId: '1051770333722',
    appId: '1:1051770333722:web:7c795ec65c77ac92ab3fa3',
});

@Controller('blog-controller')
export class BlogControllerController {

    // // POST
    // @Post('/createMessage')
    // postMessage(): string {
    //     fire.database().ref("message").push('test test222');
    //     return 'ok test';
    // }

    @Post('/createArticle')
    postArticle(@Body() body): string {
        fire.database().ref("article").push({ 'title': body.title, 'content': body.message })
        return body.message;
    }

    @Post('/updateArticle/:idArticle')
    updateArticle(@Body() body, @Param('id') idArticle: string): string {
        firebase.database().ref('article/' + idArticle).set({
            title: 'titre modifié',
            content: 'contenu modifié'
        });
        return 'update';
    }

    @Get('/removeArticle/:idArticle')
    removeArticle(@Param('id') idArticle: string): string {
        fire.database().ref("article").child(idArticle).remove();
        return "remove";
    }

    @Get('/readArticles')
    readArticles(): any {

        let refArticle = fire.database().ref("/article");
        let lstArticle = [];
        refArticle.on("value", (snapshot) => {
            let data = snapshot.val();

            try {
                Object.keys(data).forEach((key) => {
                    lstArticle.push({
                        id: key,
                        title: data[key].title,
                        content: data[key].content
                    });


                });
            } catch {
                console.log("Aucun article");
            }
        });
        console.log(lstArticle)
        return lstArticle;
    }

}
