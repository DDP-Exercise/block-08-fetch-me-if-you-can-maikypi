"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/

export class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.website = data.website;
        this.posts = [];
    }

    addPost(post) {
        this.posts.push(post);
    }

    print() {
        return `
      <article class="user" data-user-id="${this.id}">
        <h2>${this.name} (@${this.username})</h2>
        <p>
          Email: <a href="mailto:${this.email}">${this.email}</a><br>
          Website: <a href="https://${this.website}" target="_blank">${this.website}</a>
        </p>

        <button class="toggle-posts" data-user-id="${this.id}">
          Posts anzeigen
        </button>

        <div class="posts hidden" id="posts-${this.id}">
          ${this.posts.map(post => post.print()).join("")}
        </div>
      </article>
    `;
    }
}