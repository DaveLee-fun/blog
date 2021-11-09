/* HTTP GET/POST 방식 axios 기반 통신
  axios 는 Promise API 를 지원함
*/

function getNewsPost() {
    const newsMsg = document.querySelector('.news');
    newsMsg.innerText = '뉴스: 머신러닝 강좌가 나왔어요~~~';
}

getNewsPost();