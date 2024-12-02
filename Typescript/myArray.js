"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superHeros = []; // string array declaration
var animeNames = []; // another string array declaration 
superHeros.push("spiderman");
// type User = {
//     name: string,
//     isActive: boolean
// }
var allUsers = []; //thjs will store all users
// allUsers.push({name:"Vinit",isActive: true})
//array of array declarations
var MLModels = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
];
var User = /** @class */ (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    return User;
}());
var vinit = new User("Vinit", "vinit@test.com");
