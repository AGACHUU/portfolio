'use strict';

//프로젝트 필터링 관련 로직 처리
const categories = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');
categories.addEventListener('click', (event) => {
  const filter = event.target.dataset.category;
  if (filter == null) {
    return;
  }

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
