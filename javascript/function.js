// TODO: 반환값이 없는 함수
// 문자열을 인자로 전달해서 "안녕하세요, [문자열]님!"을 출력하는 함수를 구현한다
// 함수명: greet (함수 선언식), greetArrow (화살표 함수)

// 함수 선언식 정의 코드
function greet(문자열) {
  console.log(`안녕하세요, ${문자열}님!`);
}
// 화살표 함수 정의 코드
const greetArrow = (문자열) => {
  console.log(`안녕하세요, ${문자열}님!`);
};

// 함수 호출 코드
greet("김철수");
greetArrow("이영희");

/* 출력 결과
안녕하세요, 김철수님!
안녕하세요, 이영희님!
*/

// TODO: 매개변수와 반환값이 있는 함수
// 두 숫자를 인자로 전달해서 두 숫자를 곱한 데이터를 반환(return)하는 함수를 구현한다
// 함수명: multiply (함수 선언식), multiplyArrow (화살표 함수)

// 함수 선언식 정의 코드
function multiply(result1) {
  return 4 * 6;
}

// 화살표 함수 정의 코드
const multiplyArrow = (result2) => {
  return 7 * 8;
};

// 함수 호출 코드
let result1 = multiply(4, 6);
console.log(result1); // 24

let result2 = multiplyArrow(7, 8);
console.log(result2); // 56

/* 출력 결과
24
56
*/

// TODO: 제곱 함수
// 숫자 하나를 인자로 전달해서 제곱한 데이터를 반환(return)하는 함수를 구현한다
// 함수명: square (함수 선언식), squareArrow (화살표 함수)

// 함수 선언식 정의 코드
function square(result3) {
  return 5 * 5;
}
// 화살표 함수 정의 코드
const squareArrow = (result4) => {
  return 8 * 8;
};
// 함수 호출 코드
let result3 = square(5);
console.log(result3);

let result4 = squareArrow(8);
console.log(result4);

/* 출력 결과
25
64
*/

// TODO: 1 부터 인자 데이터까지 출력하는 함수
// 숫자 하나를 인자로 전달해서 1부터 인자 데이터까지 출력하는 함수를 구현한다
// 반복문을 활용한다
// 함수명: printFromOne (함수 선언식), printFromOneArrow (화살표 함수)

// 함수 선언식 정의 코드
function printFromOne(a) {
  for (let i = 0; i < a; i++) {
    console.log(i + 1);
  }
}
// 화살표 함수 정의 코드
const printFromOneArrow = (b) => {
  for (let i = 0; i < b; i++) {
    console.log(i + 1);
  }
};

// 함수 호출 코드
printFromOne(5);

console.log("---");

printFromOneArrow(10);

/* 출력 결과
1
2
3
4
5
---
1
2
3
4
5
6
7
8
9
10
*/

// TODO: 1 부터 인자 데이터까지 더하는 함수
// 숫자 하나를 인자로 전달해서 1부터 인자 데이터까지 더한 데이터를 반환(return)하는 함수를 구현한다
// 반복문을 활용한다
// 함수명: sum (함수 선언식), sumArrow (화살표 함수)

// 함수 선언식 정의 코드
function sum(c) {
  result1 = 0;

  for (let i = 0; i < c; i++) {
    result1 += i + 1;
  }

  return result1;
}
// 화살표 함수 정의 코드
const sumArrow = (d) => {
  result2 = 0;

  for (let i = 0; i < d; i++) {
    result2 += i + 1;
  }

  return result2;
};

// 함수 호출 코드
let result5 = sum(10);
console.log(result5);

let result6 = sumArrow(100);
console.log(result6);

/* 출력 결과
55
5050
*/

// TODO: 더 큰 수 반환 함수
// 두 데이터를 인자로 전달해서 크기를 비교해서 더 큰 데이터를 반환(return)하는 함수를 구현한다
// 두 데이터가 같으면 둘 중 아무거나 반환한다
// 함수명: max (함수 선언식), maxArrow (화살표 함수)

// 함수 선언식 정의 코드

function max(j, k) {
  if (j < k) {
  } else if (j > k) {
  } else {
  }
  return k;
}

// 화살표 함수 정의 코드
const maxArrow = (j, k) => {
  if (j > k) {
  } else if (j < k) {
  } else {
  }
  return j;
};
// 함수 호출 코드
let result7 = max(5, 10);
console.log(result7);

let result8 = maxArrow(8, 1);
console.log(result8);

let result9 = maxArrow("a", "b");

/* 출력 결과
10
8
b
*/

// TODO: 두 숫자 사이의 합 반환 함수
// 두 숫자를 인자로 전달해서 두 숫자 사이의 합을 반환(return)하는 함수를 구현한다
// 반복문을 활용한다
// 함수명: sumBetween (함수 선언식), sumBetweenArrow (화살표 함수)

// 함수 선언식 정의 코드

function sumBetween(a, b) {
  let sum = 0;
  for (let k = a; k <= b; k++) {
    sum = sum + k;
  }
  return sum;
}
console.log(sum);
// 화살표 함수 정의 코드
const sumBetweenArrow = (a, b) => {
  let sum = 0;
  for (let k = a; k <= b; k++) {
    sum = sum + k;
  }
  return sum;
};
console.log(sumBetweenArrow);

// 함수 호출 코드
let result10 = sumBetween(5, 10);
console.log(result10);

let result11 = sumBetweenArrow(90, 100);
console.log(result11);

/* 출력 결과
45
1045
*/

// TODO: 성적 등급 변환 함수
// 숫자 하나를 인자로 전달해서 숫자에 해당하는 등급(90이상: "A", 80이상: "B", 70이상: "C", 그 외: "D")을 반환(return)하는 함수를 구현한다
// 함수명: getGrade (함수 선언식), getGradeArrow (화살표 함수)

// 함수 선언식 정의 코드
function getGrade(a) {
  if (a >= 90) {
    return "A";
  } else if (a >= 80) {
    return "B";
  } else if (a >= 70) {
    return "C";
  } else {
    return "D";
  }
  console.log(a);
}

// 화살표 함수 정의 코드
const getGradeArrow = (a) => {
  if (a >= 90) {
    return "A";
  } else if (a >= 80) {
    return "B";
  } else if (a >= 70) {
    return "C";
  } else {
    return "D";
  }
  console.log(a);
};
// 함수 호출 코드
let result12 = getGrade(95);
console.log(result12);
let result13 = getGradeArrow(78);
console.log(result13);
let result14 = getGradeArrow(85);
console.log(result14);
let result15 = getGradeArrow(0);
console.log(result15);

/* 출력 결과
A
C
B
D
*/
