const panels = Array.from(document.querySelectorAll('.panel'));
  const headerHeight = 55;

  function layoutPanels(activeIndex = null) {
    const total = panels.length;

    panels.forEach((panel) => {
      panel.classList.remove('active');
    });

    if (activeIndex === null) {
      // 기본 상태: 전부 아래에서부터 쌓임
      panels.forEach((panel, i) => {
        panel.style.top = 'auto';
        panel.style.bottom = `${(total - 1 - i) * headerHeight}px`;
        panel.style.height = `${headerHeight}px`;
      });
      return;
    }

    panels[activeIndex].classList.add('active');

    panels.forEach((panel, i) => {
      if (i < activeIndex) {
        // 클릭한 패널 위쪽 애들: top 기준으로 쌓기
        panel.style.top = `${i * headerHeight}px`;
        panel.style.bottom = 'auto';
        panel.style.height = `${headerHeight}px`;
      } else if (i === activeIndex) {
        // 클릭한 패널: 위에서부터 시작해서 아래 패널들 전까지 펼치기
        const belowCount = total - activeIndex - 1;
        const bottomReserved = belowCount * headerHeight;

        panel.style.top = `${i * headerHeight}px`;
        panel.style.bottom = 'auto';
        panel.style.height = `calc(100vh - ${i * headerHeight}px - ${bottomReserved}px)`;
      } else {
  // 클릭한 패널 아래 애들: top 기준으로 위치 계산
  const fromBottom = total - 1 - i;
  panel.style.bottom = 'auto';
  panel.style.top = `calc(100vh - ${(fromBottom + 1) * headerHeight}px)`;
  panel.style.height = `${headerHeight}px`;
}
    });
  }

  panels.forEach((panel, index) => {
    panel.addEventListener('click', () => {
      const isActive = panel.classList.contains('active');
      layoutPanels(isActive ? null : index);
    });
  });

  layoutPanels();