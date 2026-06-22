"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/


export class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.comments = [];
    }

    setComments(comments) {
        this.comments = comments;
    }

    print() {
        return `
      <article class="post" data-post-id="${this.id}">
        <h3>${this.title}</h3>
        <p>${this.body}</p>

        <button class="load-comments" data-post-id="${this.id}">
          Kommentare laden
        </button>

        <div class="comments" id="comments-${this.id}"></div>
      </article>
    `;
    }

    printComments() {
        return this.comments.map(comment => `
      <div class="comment">
        <h4>${comment.name}</h4>
        <p><a href="mailto:${comment.email}">${comment.email}</a></p>
        <p>${comment.body}</p>
      </div>
    `).join("");
    }
}