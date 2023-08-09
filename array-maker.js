//makes an unsorted array of n distinct integers in the range(min,max).
//n cannot be greater than 100
function arrayMaker(n, min, max) {
    if ((n > max - min)|| (n > 100) || (n < 0) ) {
        return "invalid input";
    }
    let arr = [];
    while (arr.length < n) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!arr.includes(num)) {
            arr.push(num);
        }
    }
    return arr;
}

console.log(arrayMaker(48, -100, 250));