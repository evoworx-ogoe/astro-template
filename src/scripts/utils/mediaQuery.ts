export const mediaQuery = window.matchMedia('(min-width: 768px)');
export const createMediaQuery = (mediaQueryString: string = '(min-width: 768px)') => window.matchMedia(mediaQueryString);
