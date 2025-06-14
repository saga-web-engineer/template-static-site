/**
 * 全てのbr, wbrタグにaria-hidden="true"を付与
 */

export const addAriaHiddenToBr = (): void => {
  const brTags = document.querySelectorAll<HTMLBRElement>('br, wbr');

  brTags.forEach((brTag) => {
    if (!brTag.hasAttribute('aria-hidden')) brTag.setAttribute('aria-hidden', 'true');
  });
};
