/****************************
 * Filename: fxp.js
 * Purpose: Learning Javascript
 * Author: YS
 ****************************/

const {UsersService, PostsService, CommentsService} = require('./services.js');

let userService = new UsersService();

function getUserIdFromName(userName, users) {
    return users.find((user) => user.name === userName).id;
}

//Async Version
async function printPostsByUserNameAsync(userName) {
    const users = await userService.getUsers();
    const userId = getUserIdFromName(userName, users);
    const postsService = new PostsService(users);
    const posts = await postsService.getUserPost(userId);
    const commentsService = new CommentsService(posts);
    console.log(`The posts written by ${userName} are:`)
    for (const post of posts) {
        console.log(post.text);
        for (const commentId of post.comments) {
            const comment = await commentsService.getComment(commentId);
            console.log(`   -   ${comment.text}`);
        }
    }
}

//Promise Version - which is quite ugly
function printPostsByUserName(userName) {
    userService.getUsers().then(users => {
        const userId = getUserIdFromName(userName, users);
        const postsService = new PostsService(users);
        postsService.getUserPost(userId).then(posts => {
            const commentsService = new CommentsService(posts);
            console.log(`The posts written by ${userName} are:`)
            for (const post of posts) {
                let postPrinted = false;
                for (const commentId of post.comments) {
                    commentsService.getComment(commentId).then(comment => {
                        if (!postPrinted) {
                            console.log(post.text);
                            postPrinted = true;
                        }
                        console.log(`   -   ${comment.text}`);
                    });
                }
            }
        });
    });
}

//Testing
const users = userService.getUsers().then((users) => {
    const names = users.map((user) => user.name);
    const chosenName = names[0];
    printPostsByUserName(chosenName);
});