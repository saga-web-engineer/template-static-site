/**
 * ビューポートの初期化とリサイズイベントの設定
 * デバウンスされたリサイズハンドラーを登録し、初期実行を行う
 */
export const initializeViewport = (): void => {
  const debouncedResize = debounce(handleResize);
  window.addEventListener('resize', debouncedResize, false);
  debouncedResize();
};

/**
 * 360px未満の場合は固定幅
 */
const handleResize = (): void => {
  const minWidth = 360;
  const value =
    window.outerWidth > minWidth ? 'width=device-width,initial-scale=1' : `width=${minWidth}`;
  const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
  if (viewport && viewport.getAttribute('content') !== value) {
    viewport.setAttribute('content', value);
  }
};

/**
 * 関数の実行を遅延させるデバウンス機能
 * @param callback - 遅延実行する関数
 * @returns デバウンスされた関数
 */
const debounce = <T extends unknown[], R>(callback: (...args: T) => R): ((...args: T) => void) => {
  let timeout: number | undefined;

  return (...args: T): void => {
    if (timeout !== undefined) cancelAnimationFrame(timeout);
    timeout = requestAnimationFrame(() => callback(...args));
  };
};

/**
 * DOMContentLoadedイベントでビューポート機能を初期化
 * ページ読み込み完了後にビューポート制御を開始する
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeViewport();
});
