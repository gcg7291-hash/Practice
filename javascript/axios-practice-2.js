import axios from "axios";
const BASE_URL = "https://dummyjson.com";

// TODO: ID가 10인 상품(Product) 조회 후 리뷰(reviews) 출력
// 아래 요구사항을 참고하여 코드를 작성한다
// 1. ID가 10인 상품(Product) 조회 요청
// 2. 응답 데이터 객체에서 리뷰(reviews) 배열을 찾아서 출력
// async function ProductId(pId) {
//   const res = await axios.get(`${BASE_URL}/products/${pId}`);
//   const product = res["data"];
//   console.log(product["reviews"]);
// }
// ProductId(10);
/* 출력 결과

[
  {
    rating: 1,
    comment: 'Very dissatisfied!',
    date: '2025-04-30T09:41:02.053Z',
    reviewerName: 'Cameron Perez',
    reviewerEmail: 'cameron.perez@x.dummyjson.com'
  },
  {
    rating: 5,
    comment: 'Very happy with my purchase!',
    date: '2025-04-30T09:41:02.053Z',
    reviewerName: 'Daniel Cook',
    reviewerEmail: 'daniel.cook@x.dummyjson.com'
  },
  {
    rating: 4,
    comment: 'Highly impressed!',
    date: '2025-04-30T09:41:02.053Z',
    reviewerName: 'Addison Wright',
    reviewerEmail: 'addison.wright@x.dummyjson.com'
  }
]
 */
// TODO: ID가 10인 상품(Product) 조회 후 리뷰(reviews)의 평균 점수(rating) 출력
// 아래 요구사항을 참고하여 코드를 작성한다
// 1. ID가 10인 상품(Product) 조회 요청
// 2. 응답 데이터 객체에서 리뷰(reviews) 배열 추출
// 3. 리뷰(reviews) 배열에 포함된 점수(rating)로 평균 점수(rating) 계산 후 출력
async function ProtId(ppId) {
  const res = await axios.get(`${BASE_URL}/products/${ppId}`);
  const product = res["data"];
  const reviews = product["reviews"];
  if (reviews && reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    console.log(`${ppId}${averageRating.toFixed(2)}`);
  }
}
ProtId(10);

/* 출력 결과
3.3333333333333335
*/

// TODO: 게시글(posts) 태그(tag list) 목록 조회 후 출력
// 아래 요구사항을 참고하여 코드를 작성한다
// 1. 게시글(posts) 태그(tag list) 목록 조회 요청
// 2. 응답 데이터를 출력한다
async function postTaglist() {
  const pl = `${BASE_URL}/posts/tag-list`;
  const res = await axios.get(pl);
  const list = res["data"];
  console.log(list);
}
postTaglist();

/* 출력 결과
[
  "history",
  "american",
  "crime",
  "french",
  "fiction",
  "english",
  "magical",
  "mystery",
  "love",
  "classic",
  "memory",
  "nostalgia",
  "nature",
  "tranquility",
  "life",
  "books",
  // ...
]
*/

// TODO: 특정(tag)의 게시글(posts) 목록 조회 후 출력
// 아래 요구사항을 참고하여 코드를 작성한다
// 1. 특정 태그의 게시글(posts) 목록 조회 요청
// 2. 응답 데이터를 출력한다
// async function pT() {
//   const res = await axios.get(`${BASE_URL}/posts/tag/books`);
//   const data = res["data"];
//   console.log(data);
// }
// pT();

/* 출력 결과
// life 태그 게시글
{
  posts: [
    {
      id: 153,
      title: 'The forest was alive with the sounds of nature',
      body: "Birds sang, leaves rustled, and a gentle stream trickled nearby. It was a symphony of life, a reminder of the world's beauty. The dense canopy overhead filtered the sunlight, creating a mosaic of light and shadow on the forest floor, a tranquil haven far from the chaos of modern life.",
      tags: [Array],
      reactions: [Object],
      views: 1868,
      userId: 24
    },
    {
      id: 167,
      title: 'The market was a bustling maze of sights and sounds',
      body: 'Stalls filled with colorful produce, the air rich with the scent of spices and fresh flowers. Vendors called out their wares, and the crowd moved in a vibrant dance. It was a place of energy and life, where every visit promised something new.',
      tags: [Array],
      reactions: [Object],
      views: 3654,
      userId: 118
    },
    {
      id: 190,
      title: 'The farm was a bustling hub of activity',
      body: 'Animals roamed the fields, and the air was filled with the sounds of clucking chickens and lowing cows. Crops swayed in the breeze, promising a good harvest. It was a place of hard work and satisfaction, where the rhythm of life followed the seasons.',
      tags: [Array],
      reactions: [Object],
      views: 488,
      userId: 188
    }
  ],
  total: 3,
  skip: 0,
  limit: 3
}

// books 태그 게시글
{
  posts: [
    {
      id: 154,
      title: 'She found solace in books',
      body: 'Each page a new adventure, a new world to explore. They were her escape, her refuge from the chaos of reality. Lost in the stories, she traveled to distant lands, met fascinating characters, and experienced the thrill of the unknown, all from the comfort of her favorite chair.',
      tags: [Array],
      reactions: [Object],
      views: 2529,
      userId: 133
    },
    {
      id: 171,
      title: 'The library was a haven for book lovers',
      body: 'Rows upon rows of books, each holding a world of knowledge and imagination. The scent of old paper and the quiet rustle of pages created an atmosphere of calm and inspiration. It was a place where stories came to life and minds were set free.',
      tags: [Array],
      reactions: [Object],
      views: 200,
      userId: 46
    },
    {
      id: 181,
      title: 'The bookshop was a treasure trove',
      body: 'Every shelf crammed with stories waiting to be discovered. The scent of old books and the quiet atmosphere created a haven for book lovers. It was a place where time stood still, and one could lose themselves in the magic of reading.',
      tags: [Array],
      reactions: [Object],
      views: 2367,
      userId: 36
    },
    {
      id: 247,
      title: 'The cozy bookstore was a haven for book lovers',
      body: 'Shelves lined with books stretched from floor to ceiling, each one a portal to another world. The scent of paper and ink filled the air, and the sound of pages turning was like music to the ears. It was a place where imaginations soared and hearts found refuge.',
      tags: [Array],
      reactions: [Object],
      views: 2054,
      userId: 132
    }
  ],
  total: 4,
  skip: 0,
  limit: 4
}

*/

// TODO: 상품명으로 상품(Products) 조회(Search products) 후 검색 수(total) 출력
// 아래 요구사항을 참고하여 코드를 작성한다
// 1. 상품명으로 상품(Products) 조회(Search products) 요청
// 2. 객체 데이터에서 검색 수(total) 출력
async function pS(search) {
  const qP = new URLSearchParams({ q: search });
  const res = await axios.get(`${BASE_URL}/products/search?${qP}`);
  const data = res["data"];
  console.log(data);
}
pS("glass");

/* 출력 결과
// phone 검색 시
23

// glass 검색 시
7
*/
