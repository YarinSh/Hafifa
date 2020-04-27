/****************************
 * Filename: services.js
 * Purpose: Learning Javascript
 * Author: YS
 ****************************/

var adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful"];
var nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor"];
let loremIpsum = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing'];

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substr(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function randomEl(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}

function randomTextGenerator() {
    return randomEl(loremIpsum) + ' ' + randomEl(loremIpsum) + ' ' + randomEl(loremIpsum);
}

class UsersService {
    constructor() {
        this.users = [];

        for (let i = 0; i < 50; i++) {
            let newUser = {
                id: guid(),
                name: randomEl(adjectives) + ' ' + randomEl(nouns)
            };
            this.users.push(newUser);
        }
    }

    getUsers() {
        return Promise.resolve(this.users);
    }
}

class PostsService {
    constructor(users) {
        this.posts = [];

        users.forEach((user) => {
            let randomNumberOfPosts = Math.floor(Math.random() * 3);
            for (let i = 0; i < randomNumberOfPosts; i++) {
                this.posts.push(this.createRandPostFromUser(user))
            }

            let newPosts = Array(randomNumberOfPosts).fill(null).map(() => {
                return this.createRandPostFromUser(user);
            });

            this.posts = this.posts.concat(newPosts);
        });
    }

    createRandPostFromUser(user) {
        return {
            id: guid(),
            user_id: user.id,
            text: randomTextGenerator(),
            comments: [guid(), guid(), guid()]
        };
    }

    getUserPost(userId) {
        return Promise.resolve(this.posts.filter((post) => {
            return post.user_id === userId
        }));
    }
}

class CommentsService {
    constructor(posts) {
        this.comments = [];

        posts.forEach((post) => {
            let newComments = post.comments.map((comment) => {
                return {id: comment, text: randomTextGenerator()};
            });
            this.comments = this.comments.concat(newComments);
        });
    }

    getComment(id) {
        return Promise.resolve(this.comments.find((comment) => id ===  comment.id));
    }
}

module.exports =  {
    UsersService,
    PostsService,
    CommentsService
};