"use strict";

import { User } from "./class.user.js";
import { Post } from "./class.post.js";

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


const app = document.querySelector("#app");

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

let users = [];
let posts = [];

async function init() {
    const usersResponse = await fetch(usersUrl);
    const usersData = await usersResponse.json();

    users = usersData.map(userData => new User(userData));

    const postsResponse = await fetch(postsUrl);
    const postsData = await postsResponse.json();

    posts = postsData.map(postData => new Post(postData));

    postsData.forEach((postData, index) => {
        const user = users.find(user => user.id === postData.userId);

        if (user) {
            user.addPost(posts[index]);
        }
    });

    printUsers();
}

function printUsers() {
    app.innerHTML = users.map(user => user.print()).join("");
}

app.addEventListener("click", async function (event) {
    if (event.target.classList.contains("toggle-posts")) {
        const userId = event.target.dataset.userId;
        const postsContainer = document.querySelector(`#posts-${userId}`);

        postsContainer.classList.toggle("hidden");

        event.target.textContent = postsContainer.classList.contains("hidden")
            ? "Posts anzeigen"
            : "Posts verstecken";
    }

    if (event.target.classList.contains("load-comments")) {
        const postId = event.target.dataset.postId;
        const post = posts.find(post => post.id === Number(postId));
        const commentsContainer = document.querySelector(`#comments-${postId}`);

        if (post.comments.length > 0) {
            commentsContainer.innerHTML = post.printComments();
            return;
        }

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );

        const comments = await response.json();

        post.setComments(comments);
        commentsContainer.innerHTML = post.printComments();

        event.target.textContent = "Kommentare geladen";
        event.target.disabled = true;
    }
});

init();