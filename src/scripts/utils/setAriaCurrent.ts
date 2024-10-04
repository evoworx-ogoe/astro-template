/* ------------------------------
現在のページに対応するリンクにaria-current属性を付与する
------------------------------ */

export const setAriaCurrent = () => {
  const ariaCurrentElements = document.querySelectorAll<HTMLElement>('[data-set-aria-current]');
  const locationHref = window.location.href;
  const locationHrefWithoutDomain = locationHref.replace(/https?:\/\/[^/]+/, '');
  const locationHrefWithoutHash = locationHref.split('#')[0];

  ariaCurrentElements?.forEach((link) => {
    const elementHref = link.getAttribute('href');
    if (elementHref === locationHrefWithoutHash || elementHref === locationHrefWithoutDomain) {
      link.setAttribute('aria-current', 'page');
    }
  });
};
