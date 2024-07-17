/**
 * 360px未満はビューポート固定
 */

(function (): void {
  const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
  function switchViewport(): void {
    const value = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360';
    if (viewport?.getAttribute('content') !== value) {
      viewport?.setAttribute('content', value);
    }
  }
  addEventListener('resize', switchViewport, false);
  switchViewport();
})();

export {};
