/**
 *
 * ModalManager
 *
 * https://github.com/mui-org/material-ui/blob/f55f3a4f808d1756d11d056195978affe4f65d5b/packages/material-ui/src/Modal/ModalManager.js
 *
 */

import { ownerDocument, ownerWindow, getScrollbarSize } from '../utils';

// Do we have a vertical scrollbar?
function isOverflowing(container: HTMLElement): boolean {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    const win = ownerWindow(doc);
    return win.innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

export function ariaHidden(node: HTMLElement, show: boolean) {
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(node: HTMLElement) {
  return parseInt(window.getComputedStyle(node)['padding-right' as any], 10) || 0;
}

const BLACKLIST = ['template', 'script', 'style'];

function isHideable(node: HTMLElement): boolean {
  return node.nodeType === 1 && BLACKLIST.indexOf(node.tagName.toLowerCase()) === -1;
}

function siblings(
  container: any,
  mount: any,
  currentNode: any,
  nodesToExclude: any,
  callback: (node: HTMLElement) => any,
) {
  const blacklist = [mount, currentNode, ...nodesToExclude];

  [].forEach.call(container.children, (node) => {
    if (blacklist.indexOf(node) === -1 && isHideable(node)) {
      callback(node);
    }
  });
}

function ariaHiddenSiblings(
  container: any,
  mountNode: any,
  currentNode: any,
  nodesToExclude: any[] = [],
  show: boolean,
) {
  siblings(container, mountNode, currentNode, nodesToExclude, (node) => ariaHidden(node, show));
}

function findIndexOf(containerInfo: any[], callback: (item: any) => any) {
  let idx = -1;
  containerInfo.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}

function handleContainer(containerInfo: any, props: any) {
  const restoreStyle: any = {};
  const style: any = {};
  const restorePaddings: any[] = [];
  let fixedNodes: any;

  if (!props.disableScrollLock) {
    restoreStyle.overflow = containerInfo.container.style.overflow;
    restoreStyle['padding-right'] = containerInfo.container.style.paddingRight;
    style.overflow = 'hidden';

    if (isOverflowing(containerInfo.container)) {
      const scrollbarSize = getScrollbarSize();

      // Use computed style, here to get the real padding to add our scrollbar width.
      style['padding-right'] = `${getPaddingRight(containerInfo.container) + scrollbarSize}px`;

      // .dui-fixed is a global helper.
      fixedNodes = ownerDocument(containerInfo.container).querySelectorAll('.dui-fixed');
      [].forEach.call(fixedNodes, (node: any) => {
        restorePaddings.push(node.style.paddingRight);
        node.style.paddingRight = `${getPaddingRight(node) + scrollbarSize}px`;
      });
    }
  }

  Object.keys(style).forEach((key) => {
    containerInfo.container.style[key] = style[key];
  });

  const restore = () => {
    if (fixedNodes) {
      [].forEach.call(fixedNodes, (node: any, i) => {
        if (restorePaddings[i]) {
          node.style.paddingRight = restorePaddings[i];
        } else {
          node.style.removeProperty('padding-right');
        }
      });
    }

    Object.keys(restoreStyle).forEach((key) => {
      if (restoreStyle[key]) {
        containerInfo.container.style.setProperty(key, restoreStyle[key]);
      } else {
        containerInfo.container.style.removeProperty(key);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container: any) {
  const hiddenSiblings: any = [];
  [].forEach.call(container.children, (node: any) => {
    if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(node);
    }
  });
  return hiddenSiblings;
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
export class ModalManager {
  modals: any[];
  containers: any[];

  constructor() {
    // this.modals[modalIndex] = modal
    this.modals = [];
    // this.containers[containerIndex] = {
    //   modals: [],
    //   container,
    //   restore: null,
    // }
    this.containers = [];
  }

  add(modal: any, container: any) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal);

    // If the modal we are adding is already in the DOM.
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblingNodes = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mountNode, modal.modalRef, hiddenSiblingNodes, true);

    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblingNodes,
    });

    return modalIndex;
  }

  mount(modal: any, props: any) {
    const containerIndex = findIndexOf(
      this.containers,
      (item) => item.modals.indexOf(modal) !== -1,
    );
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(modal: any) {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(
      this.containers,
      (item) => item.modals.indexOf(modal) !== -1,
    );
    const containerInfo = this.containers[containerIndex];

    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);

    // If that was the last modal in a container, clean up the container.
    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, true);
      }

      ariaHiddenSiblings(
        containerInfo.container,
        modal.mountNode,
        modal.modalRef,
        containerInfo.hiddenSiblingNodes,
        false,
      );
      this.containers.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    return modalIndex;
  }

  isTopModal(modal: any) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}
