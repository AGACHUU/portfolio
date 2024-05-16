'use strict';

//프로젝트 필터링 관련 로직 처리
const categories = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');
const clickHandler = (event) => {
  const filter = event.target.dataset.category;
  // event.target <= 클릭한 버튼
  // 그 버튼들에 data-category 라는 attribute 를 넣어놧음
  // data-어쩌구 attribute 는 dataset.어쩌구 로 접근가능
  // data-hi="영수" dataset.hi = "영수"
  // ex <button class="category" data-category="front-end">

  if (filter == null) {
    return;
  }

  handleActiveSelection(event.target);

  filterProjects(filter);
};

categories.addEventListener('click', (event) => {
  const filter = event.target.dataset.category;
  if (filter == null) {
    // == null 이거는 === null || === undefined 랑 같음

    // || : or 또는 둘중에 하나만 참이면 참
    // && : and 둘다 true 일때만 참

    // 1 === 2 || 2 === 2
    // false || true
    // true

    // 클릭 이벤트를 발생시킨 element에 data-category 값이 없는 경우라면
    // 여기서 이 함수를 종료한다 는 뜻
    return;
  }

  // 리턴 return 은 그 함수를 종료하고 뒤에 써진 값을 반환하는 키워드임
  // 만약 그냥 return; 이렇게 써있다면 아무것도 반환하지 않고 그 함수를 종료해버리기 위함

  handleActiveSelection(event.target);

  filterProjects(filter);
});

function handleActiveSelection(target) {
  //액티브된 매뉴를 재설정
  const active = document.querySelector('.category--selected');
  active.classList.remove('category--selected');
  //classlist는 클래스 . 안적고 이름만 적어두 댐
  target.classList.add('category--selected');
}

function filterProjects(filter) {
  //project필터링 하는 로직
  projects.forEach((project) => {
    projectsContainer.classList.add('anim-out');
    console.log(project.dataset.type);
    if (filter === 'all' || filter == project.dataset.type) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
  setTimeout(() => {
    projectsContainer.classList.remove('anim-out');
  }, 250);
}
