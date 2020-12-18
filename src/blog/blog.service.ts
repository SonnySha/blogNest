/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable, Get } from '@nestjs/common';

import firebase from 'firebase';
import 'firebase/database';
import { PostDTO } from './Post.DTO';




const fire = firebase.initializeApp({
    apiKey: 'AIzaSyA1n4Iwq3ohbs8JJdacDsAcFfU0SpJqk-g',
    authDomain: 'blog-e410e.firebaseapp.com',
    databaseURL: 'https://blog-e410e-default-rtdb.firebaseio.com',
    projectId: 'blog-e410e',
    storageBucket: 'blog-e410e.appspot.com',
    messagingSenderId: '1051770333722',
    appId: '1:1051770333722:web:7c795ec65c77ac92ab3fa3',
});

@Injectable()
export class BlogService {


    getBlog(): string {
        return 'Hello le blog !!';
    }

    // createArticle(title: string, content: string): string {
    //     fire.database().ref("article").push({ 'title': title, 'content': content })
    //     return "Article:" + title + " ajouté !";
    // }

    createArticle(post: PostDTO): string {
        console.log(post);
        // fire.database().ref("article").set(post)
        fire.database().ref("article").push({
            title: post.title,
            content: post.content,
            enable: post.enable,
            rank: post.rank,
            picture: post.picture
        });
        console.log("Posté !")
        return 'post';
    }

    getArticles(): any {

        let refArticle = fire.database().ref("/article");
        let lstArticle = [];
        refArticle.on("value", (snapshot) => {
            let data = snapshot.val();

            try {
                Object.keys(data).forEach((key) => {
                    lstArticle.push({
                        id: key,
                        title: data[key].title,
                        content: data[key].content,
                        picture: data[key].picture,
                        rank: data[key].rank,
                        enable: data[key].enable,
                    });


                });
            } catch {
                console.log("Aucun article");
            }
        });
        console.log(lstArticle)
        return lstArticle;
    }

    setArticle(idArticle: string, title: string, content: string): string {
        firebase.database().ref('article/' + idArticle).set({
            title: title,
            content: content
        });
        return 'update';
    }

    removeArticle(idArticle: string): string {
        fire.database().ref('article/' + idArticle).remove();
        return "remove";
    }

}


