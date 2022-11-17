//계산 기능을 하는 파일
//clac.js

const add = (a, b) => {
    return a + b;
}
const sub = (a, b) => {
    return a - b;
}

module.exports = {
    modulename : "calc module",
    add : add,
    sub : sub,
}