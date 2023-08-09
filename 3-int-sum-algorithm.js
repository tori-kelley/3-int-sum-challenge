//You are given an unsorted array of randomly selected unique integers
//example:


let myArray = [12,3,1,2,4,27,8,23,13,9,11];
let goal = 18;
// This means that:
/*
- there will never be the same integer twice
- integers will be randomly chosen in size
- you are allowed to have negative integers
- the array will only have maximum 100 elements


*/


/*
You are also given an argument called "targetSum"
which will be an integer.


Searching through the array you need to find, all possible UNIQUE SUMS of 3 Integers that add up to the target sum




*/


/*


these sums of 3 integers, should be returned in a 2 dimensional array
example:


[[12,11,2],...]


[[13,11,1],...]


or an empty array if there are no triple sums that add up to the target sum




- NOTE: you should NOT return DUPLICATEs of 3 integer sums that add up to the target sum


*/


//First pass solution, "brute force iteration algorithm"
function badTripleSumChecker(array,targetSum){
    answerArray =[];
    //Sort the array from smallest to largest
     array.sort((a,b)=> a-b)
    // let myArray = [1,2,3,4,8,9,11,12,13,23,27];


    // we need some kind of looping
    for(let i=0;i<array.length-3; i++){
        for(let j=1; j<array.length-2; j++){
            for(let k=2; k <array.length-1;k++){

                if(array[i]+array[j]+array[k] === targetSum){
                    answerArray.push([array[i],array[j],array[k]]);
                }
            }
        }


    }
    return answerArray;


};
//Problems with this...
//Slow, array.length-2**3 if statement checks!!!!
//lots of unnecessary checking
//doing this the dumbest way possible
//Solution sums are in a random order


//Good things about this solution:
//It works
//It was pretty easy to write
//It is easy to read
//Conceptually it makes sense
//We know we checked EVERY combination


let answer1 = badTripleSumChecker(myArray, goal);
console.log(answer1);





//How can we do this logic BETTER?
//With.... 1 loop only
// and 3 pointer variables?


function tripleSumChecker(array,targetSum){
    answerArray =[];
    //Sort the array from smallest to largest
     array.sort((a,b)=> a-b)
    // let myArray = [1,2,3,4,8,9,11,12,13,23,27];


    let leftPointer = 0;
    let rightPointer = array.length-1
    let middlePointer = Math.floor((array.length)/2);

    //Single Loop
    while (rightPointer > 1) {
        if (leftPointer == middlePointer) {
            //change right, reset others
            rightPointer--;
            leftPointer = 0;
            middlePointer = Math.floor(rightPointer/2);
        }
        if (array[leftPointer] + array[rightPointer] + array[middlePointer] < targetSum) { //if too small
            //if shifting mid doesn't make it bigger than right && the resulting sum isn't too big
            if ((middlePointer + 1 < rightPointer) && (array[leftPointer] + array[rightPointer] + array[middlePointer + 1] <= targetSum)) {
                middlePointer++;
            }
            else {
                leftPointer++;
            }
        }
        else if (array[leftPointer] + array[rightPointer] + array[middlePointer] > targetSum) {  //if too big
            //if the resulting sum isn't too small
            if (array[leftPointer] + array[rightPointer] + array[middlePointer - 1] >= targetSum) {
                middlePointer--;
            }
            else {
                leftPointer++;
            }
        }
        else { //if correct
            answerArray.push([array[leftPointer], array[middlePointer], array[rightPointer]]); //add the solution
            //change right, reset others
            rightPointer--;
            leftPointer = 0;
            middlePointer = Math.floor(rightPointer/2);
        }
    }
    return answerArray;
}

let answer2 = tripleSumChecker(myArray, goal);
console.log(answer2);