/* ------------------------------
ビューポート固定
------------------------------ */

export const viewportRewriting = (): void => {
  const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')!;
  const value = window.outerWidth > 372 ? 'width=device-width,initial-scale=1' : 'width=372';

  // viewportが存在し、contentがvalueと異なる場合はvalueを設定する
  if (viewport && viewport.getAttribute('content') !== value) {
    viewport.setAttribute('content', value);
  }
};
