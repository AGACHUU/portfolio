// document.querySelector('.header');
// document란 문서 전체에 대한 정보를 가지고 있는 객체
//document는 어디서 왔나?
// window.document.querySelector
// 도큐먼트는 윈도우에 들어있고 쿼리 셀렉터는 도큐먼트에서 지원해주는 함수
// 윈도우는 브라우저에서 기본적으로 지원해주는 객체가 윈도우
//윈도우는 글로벌 객체라고 하는데 그건 브라우저에서 기본적인 객체이다.

// const header = document.querySelector('.header');
const header = document.querySelector('.header');
// const headerRect = header.getBoundingClientRect();
// console.log(headerRect);
const headerHeight = header.getBoundingClientRect().height;
//getBoundingClientRect이란 요소의 높이를 측정해주는 함수.
// 중간중간에 원시값이 반환이 되는지 콘솔로그로 확인해보는 습관을 가짐
document.addEventListener('scroll', () => {
  //듣고 싶은 event를 적고 (scroll)듣고 싶은 함수를 () 앞에 적으면 됨
  //이렇게 되면 스크롤이란 이벤트를 할떄마다 펑션()안에 적힌 함수가 자동으로 호출하게 됨.
  //원래 funtction(){기능 어쩌고 }이런 형태 이지만 이름 없는 함수는 function을 생략하고
  //() => {}이런식으로 적어도 됨.

  console.log(window.scrollY);
  //scroll되는 y(세로)길이가  headerheight보다 크다면 다른 스타일링 구현해주기
  //scrollY값을 이용해서 얼마나 스크롤 되었는지 확인하기
  if (window.scrollY > headerHeight) {
    header.classList.add('header--dark');
  } //window에서 제공해주는  scrollY 좌표가 headerheight보다 크다면
  // header요소에 class 리스트에 header--dark를 모디파이어를 가진 클래스를 추가해줌.
  //window scroll Y가 headerheight보다 작은 경우 즉 다시 스크롤 해서 내려갈경우는 header--dark 라는 클래스를 추가해주고
  // 그반대의 경우 는 리무브 해줌
  else {
    header.classList.remove('header--dark');
    //그떄는 header--dark를 지워줌
  }
});

//home section을 아래로 스크롤시 투명하게 처리함.
const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
//offsetHeight을 사용해서 높이를 받아와줌
//opacity 는 1이 완전하게 보이는거 0이 아무것도 안보이는거라고 이해하면 됨.
// 밑에는 스크롤을 내리면 홈 화면의 투명도가 0으로 내려가는기능을 구현함/
document.addEventListener('scroll', () => {
  console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});
