/* ------------------------------
スクロール方向の監視
------------------------------ */

/*
  scrollControl(
    onScrollDown: () => console.log('Scroll Down')),
    onScrollUp: () => console.log('Scroll Up')),
  );
*/

export const scrollControl = (onScrollDown: () => void, onScrollUp: () => void, threshold: number = 4) => {
  let previousPosition: number = 0;
  let ticking: boolean = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop;
        const isScrollingDown = scrollTop > previousPosition + threshold && Math.sign(scrollTop) !== -1 && Math.sign(scrollTop) !== 0;
        const isScrollingUp = scrollTop < previousPosition - threshold;

        if (isScrollingDown) {
          // 下にスクロールした時の処理
          onScrollDown();
        } else if (isScrollingUp) {
          // 上にスクロールした時の処理
          onScrollUp();
        }
        previousPosition = scrollTop;
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
};
