const superHeros: string[] = [] // string array declaration
const animeNames: Array<string> = [] // another string array declaration 

superHeros.push("spiderman")

// type User = {
//     name: string,
//     isActive: boolean
// }

const allUsers: User[] = []  //thjs will store all users

// allUsers.push({name:"Vinit",isActive: true})

//array of array declarations
const MLModels: number[][] = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12]
]


//classes

// class User{
//     name: string;
//     email: string;
//     constructor(name: string, email: string){
//         this.name = name;
//         this.email = email
//     }
// }


class User{
    constructor(
        public name : string,
        public email : string
    ){
        this.name = name;
        this.email = email;
    }
}

const vinit = new User("Vinit", "vinit@test.com")


export {}