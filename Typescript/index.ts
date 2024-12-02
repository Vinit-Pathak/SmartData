// function addTwo(num:number):number{
//     // return num + "2" // not allowed
//     return num + 2;  //allowed
// }

// //arrow function 
// let getValue = (n:number):number=>{
//     return 1;
// }

// let heros = ["thor","ironman","spiderman"];

// //better syntax 
// heros.map((hero : string)=>{
//     return `Hero is ${hero}`
// })

// console.log(addTwo(3))


//type alias
// type User = {
//     name: string,
//     email: string,
//     isActive: boolean
// }

// function createUser (user: User){}

// console.log(createUser({name: 'John Doe', email: 'johndoe@example.com', isActive: true})) 


// type Point = {
//     x: number;
//     y: number;
//   };
   
//   function printCoord(pt: Point) {
//     console.log("The coordinate's x value is " + pt.x);
//     console.log("The coordinate's y value is " + pt.y);
//   }
   
// printCoord({ x: 100, y: 100 });

// interface Point 
interface Point {
    x: number;
    y: number;
  }
   
  function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
   
  printCoord({ x: 100, y: 100 });


type Person ={
    readonly _id: string;
    name: string,
    email: string,
    isActive: boolean,
    cardDetails?: number // ? means optional
}

type cardNumber = {
    cardNumber: string
}

type cardDate = {
    cardDate: string
}

type cardDetails = cardNumber & cardDate & {
    cvv: number
}

let person : Person = {
    _id: '123',
    name: 'John Doe',
    email: 'johndoe@example.com',
    isActive: true
}

//person._id = '123'  //cannot assign value because it is readonly property
person.name = "Vinit Pathak"  //can be changed
person.email = "vinit@gmail.com"


//since this funcn is void type so it will not return anything
function abc():void{
    console.log("hello");
}

abc();

export {}