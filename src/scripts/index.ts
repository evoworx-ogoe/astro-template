import { viewportRewriting } from '@/scripts/utils/viewport';
import { setAriaCurrent } from '@/scripts/utils/setAriaCurrent';
import { setProperty } from '@/scripts/utils/setProperty';
import { initSmoothScroll } from '@/scripts/utils/smoothScroll';

window.addEventListener('DOMContentLoaded', (): void => {
  viewportRewriting();
  setAriaCurrent();
  setProperty();
  initSmoothScroll();
});

const render = (): void => {
  viewportRewriting();
  setProperty();
};

requestAnimationFrame(render);

window.addEventListener('resize', (): void => {
  requestAnimationFrame(render);
});
