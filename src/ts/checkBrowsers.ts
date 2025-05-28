/**
 * 現在のブラウザーがGoogle Chromeかどうかを判定する
 */
export const isChrome = (): boolean => navigator.userAgent.includes('Chrome');
