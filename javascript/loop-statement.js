// TODO: 0부터 4까지 숫자 출력하기
// for 반복문을 활용해서 0부터 4까지의 숫자를 출력한다
for (let i = 0; i < 5; i++) {
  console.log(i);
}
/* 출력 결과
0
1
2
3
4
*/
console.log("---");
// TODO: 변수 N을 사용한 1부터 N까지 출력하기
// 변수 N에 6을 할당한다
// for 반복문을 활용해서 1부터 N까지의 숫자를 출력한다
for (let N = 1; N < 7; N++) {
  console.log(N);
}
console.log("---");
/* 출력 결과
1
2
3
4
5
6
*/

// TODO: break로 5에서 반복 중단하기
// for 반복문을 활용해서 1부터 10까지 반복 출력하되, 5가 되면 break로 반복을 중단한다
for (let F = 0; F < 11; F++) {
  if (F === 6) {
    break;
  }
  console.log(F);
}

/* 출력 결과
1
2
3
4
5
*/
console.log("-----");
// TODO: continue로 3 건너뛰기
// for 반복문을 활용해서 1부터 6까지 반복 출력하되, 3일 때는 continue로 반복을 건너뛴다
for (let C = 1; C < 7; C++) {
  if (C === 3) {
    continue;
  }
  console.log(C);
}
/* 출력 결과
1
2
4
5
6
*/
console.log("-----");
// TODO: 10부터 1까지 역순 출력하기
// for 반복문을 활용해서 10부터 1까지의 숫자를 역순으로 출력한다
for (let S = 10; S < 11; S--) {
  if (S === 0) {
    break;
  }
  console.log(S);
}

/* 출력 결과
10
9
8
7
6
5
4
3
2
1
*/
console.log("-----");
// TODO: 변수로 범위 지정하여 출력하기
// 변수 start에 5, end에 10을 할당한다
// for 반복문을 활용해서 start부터 end까지의 숫자를 출력한다
let start = 5;
let end = 10;
for (let i = start; i <= 10; i++) {
  console.log(i);
}
/* 출력 결과
5
6
7
8
9
10
*/
console.log("-----");
// TODO: 4의 배수에서 반복 중단하기
// for 반복문을 활용해서 1부터 20까지 반복 출력하되, 변수가 4의 배수가 되면 반복을 중단한다

/* 출력 결과
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
11
12
13
14
15
*/
console.log("-----");
// TODO: 홀수 건너뛰고 짝수만 출력하기
// for 반복문을 활용해서 1부터 10까지 반복 출력하되, 홀수일 때는 건너뛰고 짝수만 출력한다
for (let two = 1; two < 11; two++) {
  if (two % 2) {
    continue;
  }
  console.log(two);
}
/* 출력 결과
2
4
6
8
10
*/
console.log("-----");
// TODO: 2의 배수만 출력하기
// for 반복문을 활용해서 1부터 16까지 반복 출력하면서 2의 배수만 출력한다
for (let h = 1; h <= 17; h++) {
  if (h % 2) {
    continue;
  }
  console.log(h);
}
/* 출력 결과
2
4
6
8
10
12
14
16
*/
