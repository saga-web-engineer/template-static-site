import { addAriaHiddenToBr } from './ariaHiddenToBr';
import { isChrome } from './checkBrowsers';
import { initializeViewport } from './switchViewport';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const faviconTag = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="any"]');

    if (faviconTag && isChrome()) {
      if (faviconTag.parentNode) faviconTag.parentNode.removeChild(faviconTag);
    }

    initializeViewport();
    addAriaHiddenToBr();
  },
  false,
);
