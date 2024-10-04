/* ------------------------------
IntersectionObserverの初期化
------------------------------ */

export const observerOptions: IntersectionObserverInit = {
  rootMargin: '0px 0px -20% 0px',
};

export const initContinuousObserver = (
  target: string,
  isIntersectingCallback: Function,
  isNotIntersectingCallback: Function,
  options: IntersectionObserverInit = observerOptions,
) => {
  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isIntersectingCallback(entry);
      } else {
        isNotIntersectingCallback(entry);
      }
    });
  };

  const initObserver: IntersectionObserver = new IntersectionObserver(onIntersection, options);

  const targetElement = document.querySelectorAll(target);
  targetElement?.forEach((element) => {
    initObserver.observe(element);
  });
};

export const initOnceObserver = (target: string, isIntersectingCallback: Function, options: IntersectionObserverInit = observerOptions) => {
  const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isIntersectingCallback(entry);
        observer.unobserve(entry.target);
      }
    });
  };

  const initObserver: IntersectionObserver = new IntersectionObserver(onIntersection, options);

  const targetElement = document.querySelectorAll(target);
  targetElement?.forEach((element) => {
    initObserver.observe(element);
  });
};
