/* ------------------------------
プロパティの設定
------------------------------ */

const header = document.getElementById('header');

export const setProperty = (): void => {
  const documentElement = document.documentElement;
  const headerHeight = header?.offsetHeight || 0;
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

  documentElement.style.setProperty('--window-width', `${documentElement.clientWidth}px`);
  documentElement.style.setProperty('--window-height', `${documentElement.clientHeight}px`);
  documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};

export const setPropertyElementHeight = (targetElement: HTMLElement, setPropertyElement: HTMLElement, propertyName: string): void => {
  const render = (): void => {
    const targetElementHeight = targetElement.clientHeight;
    setPropertyElement.style.setProperty(`${propertyName}`, `${targetElementHeight}px`);
  };
  requestAnimationFrame(render);

  window.addEventListener('resize', () => {
    requestAnimationFrame(render);
  });
};
