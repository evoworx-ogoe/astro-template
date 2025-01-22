/* ------------------------------
スムーズスクロール
------------------------------ */

const header = document.getElementById('header');
const headerHeight = header?.offsetHeight;
const SCROLL_OFFSET = headerHeight || 0;

const smoothScrollTo = (targetElement: HTMLElement) => {
  const elementPosition = targetElement.getBoundingClientRect().top;
  // elementPositionが負の値ならヘッダーの高さ分だけスクロール位置をずらす
  // const isNegative = elementPosition < 0;
  // const offset = isNegative ? SCROLL_OFFSET : 0;
  const offsetPosition = elementPosition + window.scrollY - SCROLL_OFFSET;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

const getScrollToAnchor = (event: Event, target: HTMLAnchorElement) => {
  event.preventDefault();
  const targetId = target.hash;
  if (targetId) {
    if (window.history.pushState) {
      // ブラウザの履歴に追加
      window.history.pushState(null, '', targetId);
    } else {
      // ハッシュが使えないブラウザの場合はURLにハッシュを追加
      window.location.hash = targetId;
    }

    const targetElement = document.querySelector<HTMLElement>(targetId);
    if (!targetElement) return;
    smoothScrollTo(targetElement);
  }
};

export const initSmoothScroll = () => {
  const innerAnchor = document.querySelectorAll('a[href^="#"]');
  innerAnchor?.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = event.target as HTMLAnchorElement;
      getScrollToAnchor(event, target);
    });
  });
};
