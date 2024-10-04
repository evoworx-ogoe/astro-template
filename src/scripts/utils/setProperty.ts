/* ------------------------------
プロパティの設定
------------------------------ */

const header = document.getElementById('header');
const documentElement = document.documentElement;
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

export const setProperty = (): void => {
  const viewportWidthPercentage = documentElement.clientWidth;
  const viewportHeightPercentage = documentElement.clientHeight;
  const headerHeight = header?.offsetHeight || 0;

  documentElement.style.setProperty('--window-width', `${viewportWidthPercentage}px`);
  documentElement.style.setProperty('--window-height', `${viewportHeightPercentage}px`);
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
