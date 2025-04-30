/* ------------------------------
IntersectionObserverの初期化
------------------------------ */

/*
  initIntersectionObserver({
    target: '.js-target',
    isIntersectingCallback: () => {
      console.log('isIntersecting');
    },
    isNotIntersectingCallback: () => {
      console.log('isNotIntersecting');
    },
    options?: {
      rootMargin: '0px 0px -20% 0px',
    },
  })
*/

interface initIntersectionObserver {
  target: string;
  isIntersectingCallback: (entry: IntersectionObserverEntry) => void;
  isNotIntersectingCallback?: (entry: IntersectionObserverEntry) => void;
  options?: IntersectionObserverInit;
}

const observerOptions: IntersectionObserverInit = {
  rootMargin: '0px 0px -20% 0px',
};

export const initIntersectionObserver = ({ target, isIntersectingCallback, isNotIntersectingCallback, options = observerOptions }: initIntersectionObserver) => {
  const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isIntersectingCallback(entry);
        isNotIntersectingCallback || observer.unobserve(entry.target);
      } else {
        isNotIntersectingCallback && isNotIntersectingCallback(entry);
      }
    });
  };

  const initObserver: IntersectionObserver = new IntersectionObserver(onIntersection, options);

  const targetElements = document.querySelectorAll(target);
  targetElements?.forEach((targetElement) => {
    initObserver.observe(targetElement);
  });
};
