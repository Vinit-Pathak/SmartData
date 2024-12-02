//enums are used to define the restrictions which will be constant and it will group things together
enum SeatChoice {
    AISLE,
    MIDDLE,
    WINDOW
}

//way to access the enum values
const myChoice = SeatChoice.MIDDLE;
// const myChoice = SeatChoice.WINDOW;
// const myChoice = SeatChoice.AISLE;

//this is also allowed
enum Options{
    YES = "Yes",
    NO = 0,
    MAYBE = "Maybe"
}



//tuple
const myTuple: [number, string, boolean] = [1, "Hello", true];

export {}