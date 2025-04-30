import '@/styles/index.scss';
import { viewportRewriting } from '@/scripts/utils/viewport';
import { setProperty } from '@/scripts/utils/setProperty';
import { initSmoothScroll } from '@/scripts/utils/smoothScroll';
import { initAccordion } from '@/scripts/ui/accordion';
import { initTab } from '@/scripts/ui/tab';

window.addEventListener('DOMContentLoaded', (): void => {
  viewportRewriting();
  setProperty();
  initSmoothScroll();
  initAccordion();
  initTab();
});

const render = (): void => {
  viewportRewriting();
  setProperty();
};

requestAnimationFrame(render);

const debounce = (func: () => void, wait: number): (() => void) => {
  let timeout: number | undefined;
  return (): void => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func();
    }, wait);
  };
};

const debouncedRender = debounce(() => {
  requestAnimationFrame(render);
}, 200);

window.addEventListener('resize', debouncedRender);
