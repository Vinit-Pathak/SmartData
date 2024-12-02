let score: number | string = 33
score = 44  //chanegable
score = "Score"  //chanegable
//score = true  //not allowed since we didn't mention the type in the declaration


type User = {
    name: string;
    id: number;
}

type Admin = {
    userName: string;
    id: number;
}

// union type 1
let Role : User | Admin = {
    name: "Vinit",
    id: 123
}

// union type 2
Role = {
    userName: "Admin",
    id: 456
}

//union narrowing type
function getDBId (id: number | string){
    if(typeof id === "string"){
        console.log( `DB ID: ${id}`)
    }else{
        console.log(`Invalid ID: ${id}`)
    }
}

//we can do this since we define that it can take number/string as a parameter
getDBId(12)  //allowed
getDBId("12")  //allowed



//array

const data: number[] = [1,2,3]
const data2: string[] = ["1", "2", "3"] 
const data3: string[] | number[] = ["1","2"]