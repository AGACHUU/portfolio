//  구현계획
//1.모든섹션 요소들과 메뉴 아이템들을 가지고 온다.
//2.intersectionObserver를 사용해서 모든 섹션들을 관찰 해야한다.
//3. 보여지는 섹션에 해당하는 메뉴 아이템들을 활성화 시킨다.
//보여지는 섹션: 다수의 섹션이 동시에 보여진다면, 가장 첫번쨰 섹션
//마지막 contact 섹션이 보여진다면, 그러면 가장 마지막 섹션을 선택

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#mywork',
  '#testimonial',
  '#contact',
];
//아이디를 가지고 있는 배열을 만들어주며매핑을 해주며 이용
const sections = sectionIds.map((id) => document.querySelector(id));

const navItems = sectionIds.map((id) =>
  document.querySelector(`[href="${id}"]`)
);

const visibleSections = sectionIds.map(() => false);
//보여주고 있는지 아닌지를 저장할수 있는 비지블 섹션이란 배열을 만듬

let activeNavItem = navItems[0];

const options = {
  rootMargin: '-20% 0px 0px 0px',
  threshold: [0, 0.98],
};
const observer = new IntersectionObserver(observerCallback, options);

sections.forEach((section) => observer.observe(section));
// observer: observe(타겟) 호출해두면, 그 타겟이 화면과 교차한 상태가 변한 애들이 entries로 담겨서 observerCallback 을 호출한다
// 예를들어서 보이던 애가 안보이게 되거나, 안보이던애가 보이면 걔네가 entries 애 담겨서 callback 호출

function observerCallback(entries) {
  let selectLastOne; //flag변수는 트루인지 아닌지를 간직할수 있는 변수임

  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;

    selectLastOne =
      index === sectionIds.length - 1 &&
      //===를 이용해 세가지 조건중 하나라도 해당하지 못한다면 false
      entry.isIntersecting &&
      entry.intersectionRatio >= 0.95;

    // console.log(visibleSections);
    // console.log('무조건 라스트섹션', selectLastOne);
    // console.log(selectLastOne);

    const navIndex = selectLastOne
      ? sectionIds.length - 1
      : findFirstIntersecting(visibleSections);
    selectNavItem(navIndex);

    const navItem = navItems[navIndex];
    // 2. navindex로 navItem 을 결정함
    // 근데 여기서 navIndex가 이상한 애였다면 navItem 이 null 이 되버림

    // console.log('navItem', navItem);
    //네브 아이템에 있는 0번쨰 아이템이들어있었는데 영번쨰에 있는 엑티브를
    // 제거 해준후 현재 선택된 네브 아이템을 실제로 선택된 네브아이템을 재할당해주고
    //클래스리스트에 다시 액티브를 추가해줌

    activeNavItem.classList.remove('active');
    activeNavItem = navItem;
    // 3. 그 null을 activeNavItem 에다가 할당함
    activeNavItem.classList.add('active');
    // 4. null이 된 activeNavItem의 classList를 확인하려 시도하면 에러나겠지

    // console.log(entry.target);
    // console.log(
    //   '\tisIntersecting 교차함? \ntrue 보임 false 안보임: ',
    //   entry.isIntersecting
    // );

    // isIntersecting 이 true = 교차함 = 보여짐
    // console.log('\tintersectionRatio', entry.intersectionRatio);
    // intersectioRatio 교차비율 => 보여지는 비율 = 얼마 만큼 보여지고 있는지

    function findFirstIntersecting(intersections) {
      const index = intersections.indexOf(true);
      return index >= 0 ? index : 0;
    }
    function selectNavItem(index) {
      const navItem = navItems[index];
      if (!navItem) return;
      activeNavItem.classList.remove('active');
      activeNavItem = navItem;
      // 3. 그 null을 activeNavItem 에다가 할당함
      activeNavItem.classList.add('active');
    }

    // indexOf(검색대상) => 값이 검색대상에 해당하는 첫 요소의 인덱스를 알려줌
    // 무슨 말이냐면 [134, 413, 1, 3, 1, 34, 24] 배열에서
    // indexof(1) 하면 첫번째로 값이 1인 요소의 인덱스인 2를 반환함
    // 인덱스 = 배열에서 각 요소의 순서, 0부터 시작함

    // 근데 배열 전체를 다 돌았는데 못찾았으면 -1 을 반환함

    // 즉 찾았다면 0이상의 숫자 이고
    // 못찾으면 -1 임

    // if (index >= 0) {
    //   // 찾았다면 그 인덱스를 반환하고
    //   return index;
    // } else {
    //   // 못찾은경우는 그냥 0 반환해라
    //   return 0;
    // }
  });
}
