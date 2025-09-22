// TODO
const animals = [
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
];
animals.forEach((name) => {
  console.log(name);
});
// 변수 animals에 저장된 각 동물 이름을 한 줄씩 출력한다

/* 출력 결과
자
축
인
묘
진
사
오
미
신
유
술
해
*/

// TODO
const fruits = ["사과", "바나나", "오렌지"];
// 변수 fruits에 저장된 각 과일 이름을 "맛있는 [과일명]" 형식으로 출력한다
// 출력 결과는 배열 형식으로 출력한다
const newArray = fruits.map((element) => {
  return "맛있는" + element;
});
console.log(newArray);
/* 출력 결과
맛있는 사과
맛있는 바나나
맛있는 오렌지
*/

// TODO
const numbers = [10, 20, 30, 40];
// 변수 numbers에 저장된 각 숫자와 인덱스를 "인덱스: 숫자" 형식으로 출력한다
const newArray1 = numbers.map((index, numbers) => {
  return `${numbers} : ${index}`;
});
console.log(newArray1);

/* 출력 결과
0: 10
1: 20
2: 30
3: 40
*/

// TODO
const numbers1 = [1, 2, 3, 4, 5];
// 변수 numbers에 저장된 각 숫자를 제곱한 데이터를 모아서 새로운 배열을 만든다
// 새로운 배열을 출력한다
const newArray2 = numbers1.map((nnum) => {
  return nnum ** 2;
});
console.log(newArray2);
/* 출력 결과
[1, 4, 9, 16, 25]
*/

// TODO
const names = ["김철수", "이영희", "박민수"];
// 변수 names에 저장된 각 이름에 "님"을 붙인 새로운 배열을 만든다
// 새로운 배열을 출력한다
const newArray3 = names.map((nname) => {
  return `${nname}님`;
});
console.log(newArray3);
/* 출력 결과
["김철수님", "이영희님", "박민수님"]
*/

// TODO
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 변수 numbers에 저장된 각 숫자 중 짝수만 필터링한 새로운 배열을 만든다.
// 새로운 배열을 출력한다
numbers2.forEach((newnum) => {
  if (newnum % 2 === 0) {
    console.log(newnum);
  }
});

/* 출력 결과
[2, 4, 6, 8, 10]
*/

// TODO
const people1 = [
  { name: "김철수", age: 25 },
  { name: "이영희", age: 30 },
  { name: "박민수", age: 18 },
];
// 변수 people에 저장된 각 사람 중 나이(age)가 20세 이상인 사람만 필터링한 새로운 배열을 만든다
// 새로운 배열을 출력한다
const ple = people1.filter((e) => {
  if (e.age >= 20) {
    return true;
  }
});
console.log(ple);
/* 출력 결과
[{name: "김철수", age: 25}, {name: "이영희", age: 30}]
*/

// TODO
const numbers3 = [1, 2, 3, 4, 5];
// 변수 numbers에 저장된 각 숫자의 합을 계산한다
// 합을 출력한다
const numb = numbers3.reduce((a, b) => {
  return a + b;
});
console.log(numb);
/* 출력 결과
15
*/

// TODO
const people = [
  { id: 1, name: "김철수" },
  { id: 2, name: "이영희" },
  { id: 3, name: "박민수" },
];
// 변수 people에 저장된 각 객체 중 id가 2인 객체를 찾는다
// 찾은 객체를 출력한다
const fp = people.find((two) => {
  if (two.id === 2) {
    return true;
  }
});
console.log(fp);
/* 출력 결과
{id: 2, name: "이영희"}
*/

// TODO
const products = [
  { name: "노트북", price: 1200000, category: "전자제품" },
  { name: "마우스", price: 25000, category: "전자제품" },
  { name: "책상", price: 150000, category: "가구" },
  { name: "키보드", price: 80000, category: "전자제품" },
  { name: "의자", price: 200000, category: "가구" },
];
// 변수 products에 저장된 상품 중 전자제품 카테고리(category)만 필터링한 새로운 배열을 만든다
// 필터링한 새로운 배열을 출력한다
// 각 상품의 이름(name)과 가격(price)을 "상품명: 가격원" 형식으로 변환한 새로운 배열을 만든다
// 변환한 새로운 배열을 출력한다
const prod = products.filter((pro) => {
  if (pro.category === "전자제품") {
    return true;
  } else {
    return false;
  }
});
console.log(prod);

const np = products.map((n) => {
  return `${n.name}: ${n.price}원`;
});
console.log(np);
/* 출력 결과
[
  { name: "노트북", price: 1200000, category: "전자제품" },
  { name: "마우스", price: 25000, category: "전자제품" },
  { name: "키보드", price: 80000, category: "전자제품" },
]
["노트북: 1200000원", "마우스: 25000원", "키보드: 80000원"]
*/

// TODO
const students = [
  { name: "김철수", score: 85, grade: "A" },
  { name: "이영희", score: 92, grade: "A" },
  { name: "박민수", score: 78, grade: "B" },
  { name: "최지영", score: 88, grade: "A" },
  { name: "정수현", score: 65, grade: "C" },
];
// 변수 students에 저장된 학생 중 점수(score)가 70점 이상인 학생만 필터링한 새로운 배열을 만든다
// 필터링한 새로운 배열을 출력한다
// 각 학생의 이름(name)과 등급(grade)을 "이름(등급)" 형식으로 변환한 새로운 배열을 만든다
// 변환한 새로운 배열을 출력한다
const stu = students.filter((seven) => {
  if (seven.score >= 70) {
    return true;
  }
});
console.log(stu);

const rename = stu.map((ng) => {
  return `${ng.name}(${ng.grade})`;
});
console.log(rename);

/* 출력 결과
["김철수(A)", "이영희(A)", "박민수(B)", "최지영(A)"]
*/
