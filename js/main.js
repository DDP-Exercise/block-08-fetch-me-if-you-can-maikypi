
/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    maikypi - 2026-06-14
 *  *******************************************************/


"use strict";

import { User } from "./class.user.js";
import { Post } from "./class.post.js";

const APP = document.querySelector("#app");

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

let users = [];
let posts = [];

async function init() {
    const USERS_RESPONSE = await fetch(USERS_URL);
    const USERS_DATA = await USERS_RESPONSE.json();

    users = USERS_DATA.map(userData => new User(userData));

    const POSTS_RESPONSE = await fetch(POSTS_URL);
    const POSTS_DATA = await POSTS_RESPONSE.json();

    posts = POSTS_DATA.map(postData => new Post(postData));

    POSTS_DATA.forEach((postData, index) => {
        const USER = users.find(user => user.id === postData.userId);

        if (USER) {
            USER.addPost(posts[index]);
        }
    });

    printUsers();
}

function printUsers() {
    APP.innerHTML = users.map(user => user.print()).join("");
}

APP.addEventListener("click", async function (event) {
    if (event.target.classList.contains("toggle-posts")) {
        const USER_ID = event.target.dataset.userId;
        const POSTS_CONTAINER = document.querySelector(`#posts-${USER_ID}`);

        POSTS_CONTAINER.classList.toggle("hidden");

        event.target.textContent = POSTS_CONTAINER.classList.contains("hidden")
            ? "Posts anzeigen"
            : "Posts verstecken";
    }

    if (event.target.classList.contains("load-comments")) {
        const POST_ID = event.target.dataset.postId;
        const POST = posts.find(post => post.id === Number(POST_ID));
        const COMMENTS_CONTAINER = document.querySelector(`#comments-${POST_ID}`);

        if (POST.comments.length > 0) {
            COMMENTS_CONTAINER.innerHTML = POST.printComments();
            return;
        }

        const RESPONSE = await fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${POST_ID}`
        );

        const COMMENTS = await RESPONSE.json();

        POST.setComments(COMMENTS);
        COMMENTS_CONTAINER.innerHTML = POST.printComments();

        event.target.textContent = "Kommentare geladen";
        event.target.disabled = true;
    }
});

init();