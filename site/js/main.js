var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/assets/js/slider.js
var slider_exports = {};
__export(slider_exports, {
  ImageSlider: () => ImageSlider,
  initSliders: () => initSliders,
  setupModalSliders: () => setupModalSliders,
  sliderInstances: () => sliderInstances
});
function ensureSliderInstance(element, options) {
  if (!sliderInstances.has(element)) {
    sliderInstances.set(element, new ImageSlider(element, options));
  }
  return sliderInstances.get(element);
}
function initSliders(root = document) {
  const scope = root instanceof HTMLElement ? root : document;
  scope.querySelectorAll("[data-slider]").forEach((slider) => ensureSliderInstance(slider));
}
function setupModalSliders(micromodal = typeof window !== "undefined" ? window.MicroModal : void 0) {
  if (!micromodal || modalPatched) {
    return;
  }
  const originalShow = micromodal.show.bind(micromodal);
  micromodal.show = (modalId, options = {}) => {
    originalShow(modalId, options);
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      return;
    }
    modalElement.querySelectorAll("[data-slider]").forEach((slider) => {
      const instance = sliderInstances.get(slider);
      if (instance) {
        instance.reset();
      } else {
        ensureSliderInstance(slider);
      }
    });
  };
  modalPatched = true;
}
function observeDynamicSliders(target = document.body) {
  if (typeof MutationObserver === "undefined" || !target) {
    return;
  }
  if (sliderObserver) {
    sliderObserver.disconnect();
  }
  sliderObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }
        if (typeof node.matches === "function" && node.matches("[data-slider]")) {
          ensureSliderInstance(node);
        }
        node.querySelectorAll?.("[data-slider]").forEach((child) => ensureSliderInstance(child));
      });
    });
  });
  sliderObserver.observe(target, {
    childList: true,
    subtree: true
  });
}
function bootstrapSliders() {
  initSliders();
  setupModalSliders();
  observeDynamicSliders();
}
var SLIDER_DEFAULTS, KEYBOARD, ImageSlider, sliderInstances, modalPatched, sliderObserver;
var init_slider = __esm({
  "src/assets/js/slider.js"() {
    SLIDER_DEFAULTS = {
      trackSelector: ".c-slider__track",
      slideSelector: ".c-slider__slide",
      prevSelector: "[data-slider-prev]",
      nextSelector: "[data-slider-next]",
      paginationSelector: ".c-slider__pagination",
      swipeThreshold: 40
    };
    KEYBOARD = {
      prev: ["ArrowLeft", "Left"],
      next: ["ArrowRight", "Right"]
    };
    ImageSlider = class {
      constructor(element, options = {}) {
        this.root = element;
        this.options = { ...SLIDER_DEFAULTS, ...options };
        this.track = element.querySelector(this.options.trackSelector);
        this.slides = Array.from(element.querySelectorAll(this.options.slideSelector));
        this.prevButton = element.querySelector(this.options.prevSelector);
        this.nextButton = element.querySelector(this.options.nextSelector);
        this.pagination = element.querySelector(this.options.paginationSelector);
        this.paginationButtons = [];
        this.currentIndex = 0;
        this.touchStartX = null;
        this.touchEndX = null;
        this.handlePrev = this.goToPrev.bind(this);
        this.handleNext = this.goToNext.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.init();
      }
      init() {
        if (!this.track || this.slides.length === 0) {
          return;
        }
        if (!this.root.hasAttribute("tabindex")) {
          this.root.setAttribute("tabindex", "0");
        }
        this.root.setAttribute("role", "region");
        this.root.setAttribute("aria-roledescription", "carousel");
        this.bindEvents();
        if (this.slides.length <= 1) {
          this.toggleControls(false);
          this.updateSlides();
          return;
        }
        this.toggleControls(true);
        this.renderPagination();
        this.updateSlides();
      }
      bindEvents() {
        if (this.prevButton) {
          this.prevButton.addEventListener("click", this.handlePrev);
        }
        if (this.nextButton) {
          this.nextButton.addEventListener("click", this.handleNext);
        }
        this.root.addEventListener("keydown", this.handleKeydown);
        if (this.track) {
          this.track.addEventListener("touchstart", this.handleTouchStart, { passive: true });
          this.track.addEventListener("touchend", this.handleTouchEnd, { passive: true });
        }
      }
      renderPagination() {
        if (!this.pagination) {
          return;
        }
        this.pagination.innerHTML = "";
        this.paginationButtons = [];
        const fragment = document.createDocumentFragment();
        this.slides.forEach((_, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "c-slider__pagination-button";
          button.setAttribute("aria-label", `\u30B9\u30E9\u30A4\u30C9${index + 1}\u306B\u79FB\u52D5`);
          button.dataset.sliderIndex = String(index);
          button.addEventListener("click", () => this.goToSlide(index));
          this.paginationButtons.push(button);
          fragment.appendChild(button);
        });
        this.pagination.appendChild(fragment);
      }
      updateSlides() {
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        this.slides.forEach((slide, index) => {
          const isActive = index === this.currentIndex;
          slide.setAttribute("aria-hidden", isActive ? "false" : "true");
          slide.classList.toggle("is-active", isActive);
        });
        this.updatePagination();
        this.updateControlState();
      }
      goToPrev() {
        if (this.slides.length <= 1) {
          return;
        }
        if (this.currentIndex > 0) {
          this.currentIndex -= 1;
        } else {
          this.currentIndex = this.slides.length - 1;
        }
        this.updateSlides();
      }
      goToNext() {
        if (this.slides.length <= 1) {
          return;
        }
        if (this.currentIndex < this.slides.length - 1) {
          this.currentIndex += 1;
        } else {
          this.currentIndex = 0;
        }
        this.updateSlides();
      }
      goToSlide(index) {
        if (index < 0 || index >= this.slides.length) {
          return;
        }
        this.currentIndex = index;
        this.updateSlides();
      }
      handleKeydown(event) {
        if (KEYBOARD.prev.includes(event.key)) {
          event.preventDefault();
          this.goToPrev();
          return;
        }
        if (KEYBOARD.next.includes(event.key)) {
          event.preventDefault();
          this.goToNext();
        }
      }
      handleTouchStart(event) {
        this.touchStartX = event.changedTouches[0].clientX;
      }
      handleTouchEnd(event) {
        this.touchEndX = event.changedTouches[0].clientX;
        if (this.touchStartX === null || this.touchEndX === null) {
          return;
        }
        const deltaX = this.touchStartX - this.touchEndX;
        this.touchStartX = null;
        this.touchEndX = null;
        if (Math.abs(deltaX) < this.options.swipeThreshold) {
          return;
        }
        if (deltaX > 0) {
          this.goToNext();
        } else {
          this.goToPrev();
        }
      }
      updatePagination() {
        if (!this.paginationButtons.length) {
          return;
        }
        this.paginationButtons.forEach((button, index) => {
          const isActive = index === this.currentIndex;
          button.classList.toggle("is-active", isActive);
          if (isActive) {
            button.setAttribute("aria-current", "true");
          } else {
            button.removeAttribute("aria-current");
          }
        });
      }
      updateControlState() {
        const atStart = this.currentIndex === 0;
        const atEnd = this.currentIndex === this.slides.length - 1;
        const multipleSlides = this.slides.length > 1;
        if (this.prevButton) {
          this.prevButton.disabled = !multipleSlides || atStart;
        }
        if (this.nextButton) {
          this.nextButton.disabled = !multipleSlides || atEnd;
        }
      }
      toggleControls(shouldShow) {
        const display = shouldShow ? "" : "none";
        [this.prevButton, this.nextButton, this.pagination].forEach((element) => {
          if (element) {
            element.style.display = display;
          }
        });
      }
      reset() {
        this.currentIndex = 0;
        this.updateSlides();
      }
      destroy() {
        if (this.prevButton) {
          this.prevButton.removeEventListener("click", this.handlePrev);
        }
        if (this.nextButton) {
          this.nextButton.removeEventListener("click", this.handleNext);
        }
        if (this.track) {
          this.track.removeEventListener("touchstart", this.handleTouchStart);
          this.track.removeEventListener("touchend", this.handleTouchEnd);
        }
        this.root.removeEventListener("keydown", this.handleKeydown);
      }
    };
    sliderInstances = /* @__PURE__ */ new Map();
    modalPatched = false;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bootstrapSliders);
    } else {
      bootstrapSliders();
    }
  }
});

// node_modules/@oddbird/popover-polyfill/dist/popover.js
var ToggleEvent = class extends Event {
  oldState;
  newState;
  constructor(type, { oldState = "", newState = "", ...init2 } = {}) {
    super(type, init2);
    this.oldState = String(oldState || "");
    this.newState = String(newState || "");
  }
};
var popoverToggleTaskQueue = /* @__PURE__ */ new WeakMap();
function queuePopoverToggleEventTask(element, oldState, newState) {
  popoverToggleTaskQueue.set(
    element,
    setTimeout(() => {
      if (!popoverToggleTaskQueue.has(element)) return;
      element.dispatchEvent(
        new ToggleEvent("toggle", {
          cancelable: false,
          oldState,
          newState
        })
      );
    }, 0)
  );
}
var ShadowRoot = globalThis.ShadowRoot || function() {
};
var HTMLDialogElement = globalThis.HTMLDialogElement || function() {
};
var topLayerElements = /* @__PURE__ */ new WeakMap();
var autoPopoverList = /* @__PURE__ */ new WeakMap();
var hintPopoverList = /* @__PURE__ */ new WeakMap();
var visibilityState = /* @__PURE__ */ new WeakMap();
function getPopoverVisibilityState(popover) {
  return visibilityState.get(popover) || "hidden";
}
var popoverInvoker = /* @__PURE__ */ new WeakMap();
function lastSetElement(set) {
  return [...set].pop();
}
function popoverTargetAttributeActivationBehavior(element) {
  const popover = element.popoverTargetElement;
  if (!(popover instanceof HTMLElement)) {
    return;
  }
  const visibility = getPopoverVisibilityState(popover);
  if (element.popoverTargetAction === "show" && visibility === "showing") {
    return;
  }
  if (element.popoverTargetAction === "hide" && visibility === "hidden") return;
  if (visibility === "showing") {
    hidePopover(popover, true, true);
  } else if (checkPopoverValidity(popover, false)) {
    popoverInvoker.set(popover, element);
    showPopover(popover);
  }
}
function checkPopoverValidity(element, expectedToBeShowing) {
  if (element.popover !== "auto" && element.popover !== "manual" && element.popover !== "hint") {
    return false;
  }
  if (!element.isConnected) return false;
  if (expectedToBeShowing && getPopoverVisibilityState(element) !== "showing") {
    return false;
  }
  if (!expectedToBeShowing && getPopoverVisibilityState(element) !== "hidden") {
    return false;
  }
  if (element instanceof HTMLDialogElement && element.hasAttribute("open")) {
    return false;
  }
  if (document.fullscreenElement === element) return false;
  return true;
}
function getStackPosition(popover) {
  if (!popover) return 0;
  const autoPopovers = autoPopoverList.get(document) || /* @__PURE__ */ new Set();
  const hintPopovers = hintPopoverList.get(document) || /* @__PURE__ */ new Set();
  if (hintPopovers.has(popover)) {
    return [...hintPopovers].indexOf(popover) + autoPopovers.size + 1;
  }
  if (autoPopovers.has(popover)) {
    return [...autoPopovers].indexOf(popover) + 1;
  }
  return 0;
}
function topMostClickedPopover(target) {
  const clickedPopover = nearestInclusiveOpenPopover(target);
  const invokerPopover = nearestInclusiveTargetPopoverForInvoker(target);
  if (getStackPosition(clickedPopover) > getStackPosition(invokerPopover)) {
    return clickedPopover;
  }
  return invokerPopover;
}
function topmostAutoOrHintPopover(document2) {
  let topmostPopover;
  const hintPopovers = hintPopoverList.get(document2) || /* @__PURE__ */ new Set();
  const autoPopovers = autoPopoverList.get(document2) || /* @__PURE__ */ new Set();
  const usedStack = hintPopovers.size > 0 ? hintPopovers : autoPopovers.size > 0 ? autoPopovers : null;
  if (usedStack) {
    topmostPopover = lastSetElement(usedStack);
    if (!topmostPopover.isConnected) {
      usedStack.delete(topmostPopover);
      return topmostAutoOrHintPopover(document2);
    }
    return topmostPopover;
  }
  return null;
}
function topMostPopoverInList(list) {
  for (const popover of list || []) {
    if (!popover.isConnected) {
      list.delete(popover);
    } else {
      return popover;
    }
  }
  return null;
}
function getRootNode(node) {
  if (typeof node.getRootNode === "function") {
    return node.getRootNode();
  }
  if (node.parentNode) return getRootNode(node.parentNode);
  return node;
}
function nearestInclusiveOpenPopover(node) {
  while (node) {
    if (node instanceof HTMLElement && node.popover === "auto" && visibilityState.get(node) === "showing") {
      return node;
    }
    node = node instanceof Element && node.assignedSlot || node.parentElement || getRootNode(node);
    if (node instanceof ShadowRoot) node = node.host;
    if (node instanceof Document) return;
  }
}
function nearestInclusiveTargetPopoverForInvoker(node) {
  while (node) {
    const nodePopover = node.popoverTargetElement;
    if (nodePopover instanceof HTMLElement) return nodePopover;
    node = node.parentElement || getRootNode(node);
    if (node instanceof ShadowRoot) node = node.host;
    if (node instanceof Document) return;
  }
}
function topMostPopoverAncestor(newPopover, list) {
  const popoverPositions = /* @__PURE__ */ new Map();
  let i2 = 0;
  for (const popover of list || []) {
    popoverPositions.set(popover, i2);
    i2 += 1;
  }
  popoverPositions.set(newPopover, i2);
  i2 += 1;
  let topMostPopoverAncestor2 = null;
  function checkAncestor(candidate) {
    if (!candidate) return;
    let okNesting = false;
    let candidateAncestor = null;
    let candidatePosition = null;
    while (!okNesting) {
      candidateAncestor = nearestInclusiveOpenPopover(candidate) || null;
      if (candidateAncestor === null) return;
      if (!popoverPositions.has(candidateAncestor)) return;
      if (newPopover.popover === "hint" || candidateAncestor.popover === "auto") {
        okNesting = true;
      }
      if (!okNesting) {
        candidate = candidateAncestor.parentElement;
      }
    }
    candidatePosition = popoverPositions.get(candidateAncestor);
    if (topMostPopoverAncestor2 === null || popoverPositions.get(topMostPopoverAncestor2) < candidatePosition) {
      topMostPopoverAncestor2 = candidateAncestor;
    }
  }
  checkAncestor(newPopover.parentElement || getRootNode(newPopover));
  return topMostPopoverAncestor2;
}
function isFocusable(focusTarget) {
  if (focusTarget.hidden || focusTarget instanceof ShadowRoot) return false;
  if (focusTarget instanceof HTMLButtonElement || focusTarget instanceof HTMLInputElement || focusTarget instanceof HTMLSelectElement || focusTarget instanceof HTMLTextAreaElement || focusTarget instanceof HTMLOptGroupElement || focusTarget instanceof HTMLOptionElement || focusTarget instanceof HTMLFieldSetElement) {
    if (focusTarget.disabled) return false;
  }
  if (focusTarget instanceof HTMLInputElement && focusTarget.type === "hidden") {
    return false;
  }
  if (focusTarget instanceof HTMLAnchorElement && focusTarget.href === "") {
    return false;
  }
  return typeof focusTarget.tabIndex === "number" && focusTarget.tabIndex !== -1;
}
function focusDelegate(focusTarget) {
  if (focusTarget.shadowRoot && focusTarget.shadowRoot.delegatesFocus !== true) {
    return null;
  }
  let whereToLook = focusTarget;
  if (whereToLook.shadowRoot) {
    whereToLook = whereToLook.shadowRoot;
  }
  let autoFocusDelegate = whereToLook.querySelector("[autofocus]");
  if (autoFocusDelegate) {
    return autoFocusDelegate;
  } else {
    const slots = whereToLook.querySelectorAll("slot");
    for (const slot of slots) {
      const assignedElements = slot.assignedElements({ flatten: true });
      for (const el of assignedElements) {
        if (el.hasAttribute("autofocus")) {
          return el;
        } else {
          autoFocusDelegate = el.querySelector("[autofocus]");
          if (autoFocusDelegate) {
            return autoFocusDelegate;
          }
        }
      }
    }
  }
  const walker = focusTarget.ownerDocument.createTreeWalker(
    whereToLook,
    NodeFilter.SHOW_ELEMENT
  );
  let descendant = walker.currentNode;
  while (descendant) {
    if (isFocusable(descendant)) {
      return descendant;
    }
    descendant = walker.nextNode();
  }
}
function popoverFocusingSteps(subject) {
  var _a;
  (_a = focusDelegate(subject)) == null ? void 0 : _a.focus();
}
var previouslyFocusedElements = /* @__PURE__ */ new WeakMap();
function showPopover(element) {
  if (!checkPopoverValidity(element, false)) {
    return;
  }
  const document2 = element.ownerDocument;
  if (!element.dispatchEvent(
    new ToggleEvent("beforetoggle", {
      cancelable: true,
      oldState: "closed",
      newState: "open"
    })
  )) {
    return;
  }
  if (!checkPopoverValidity(element, false)) {
    return;
  }
  let shouldRestoreFocus = false;
  const originalType = element.popover;
  let stackToAppendTo = null;
  const autoAncestor = topMostPopoverAncestor(
    element,
    autoPopoverList.get(document2) || /* @__PURE__ */ new Set()
  );
  const hintAncestor = topMostPopoverAncestor(
    element,
    hintPopoverList.get(document2) || /* @__PURE__ */ new Set()
  );
  if (originalType === "auto") {
    closeAllOpenPopoversInList(
      hintPopoverList.get(document2) || /* @__PURE__ */ new Set(),
      shouldRestoreFocus,
      true
    );
    const ancestor = autoAncestor || document2;
    hideAllPopoversUntil(ancestor, shouldRestoreFocus, true);
    stackToAppendTo = "auto";
  }
  if (originalType === "hint") {
    if (hintAncestor) {
      hideAllPopoversUntil(hintAncestor, shouldRestoreFocus, true);
      stackToAppendTo = "hint";
    } else {
      closeAllOpenPopoversInList(
        hintPopoverList.get(document2) || /* @__PURE__ */ new Set(),
        shouldRestoreFocus,
        true
      );
      if (autoAncestor) {
        hideAllPopoversUntil(autoAncestor, shouldRestoreFocus, true);
        stackToAppendTo = "auto";
      } else {
        stackToAppendTo = "hint";
      }
    }
  }
  if (originalType === "auto" || originalType === "hint") {
    if (originalType !== element.popover || !checkPopoverValidity(element, false)) {
      return;
    }
    if (!topmostAutoOrHintPopover(document2)) {
      shouldRestoreFocus = true;
    }
    if (stackToAppendTo === "auto") {
      if (!autoPopoverList.has(document2)) {
        autoPopoverList.set(document2, /* @__PURE__ */ new Set());
      }
      autoPopoverList.get(document2).add(element);
    } else if (stackToAppendTo === "hint") {
      if (!hintPopoverList.has(document2)) {
        hintPopoverList.set(document2, /* @__PURE__ */ new Set());
      }
      hintPopoverList.get(document2).add(element);
    }
  }
  previouslyFocusedElements.delete(element);
  const originallyFocusedElement = document2.activeElement;
  element.classList.add(":popover-open");
  visibilityState.set(element, "showing");
  if (!topLayerElements.has(document2)) {
    topLayerElements.set(document2, /* @__PURE__ */ new Set());
  }
  topLayerElements.get(document2).add(element);
  setInvokerAriaExpanded(popoverInvoker.get(element), true);
  popoverFocusingSteps(element);
  if (shouldRestoreFocus && originallyFocusedElement && element.popover === "auto") {
    previouslyFocusedElements.set(element, originallyFocusedElement);
  }
  queuePopoverToggleEventTask(element, "closed", "open");
}
function hidePopover(element, focusPreviousElement = false, fireEvents = false) {
  var _a, _b;
  if (!checkPopoverValidity(element, true)) {
    return;
  }
  const document2 = element.ownerDocument;
  if (["auto", "hint"].includes(element.popover)) {
    hideAllPopoversUntil(element, focusPreviousElement, fireEvents);
    if (!checkPopoverValidity(element, true)) {
      return;
    }
  }
  const autoList = autoPopoverList.get(document2) || /* @__PURE__ */ new Set();
  const autoPopoverListContainsElement = autoList.has(element) && lastSetElement(autoList) === element;
  setInvokerAriaExpanded(popoverInvoker.get(element), false);
  popoverInvoker.delete(element);
  if (fireEvents) {
    element.dispatchEvent(
      new ToggleEvent("beforetoggle", {
        oldState: "open",
        newState: "closed"
      })
    );
    if (autoPopoverListContainsElement && lastSetElement(autoList) !== element) {
      hideAllPopoversUntil(element, focusPreviousElement, fireEvents);
    }
    if (!checkPopoverValidity(element, true)) {
      return;
    }
  }
  (_a = topLayerElements.get(document2)) == null ? void 0 : _a.delete(element);
  autoList.delete(element);
  (_b = hintPopoverList.get(document2)) == null ? void 0 : _b.delete(element);
  element.classList.remove(":popover-open");
  visibilityState.set(element, "hidden");
  if (fireEvents) {
    queuePopoverToggleEventTask(element, "open", "closed");
  }
  const previouslyFocusedElement = previouslyFocusedElements.get(element);
  if (previouslyFocusedElement) {
    previouslyFocusedElements.delete(element);
    if (focusPreviousElement) {
      previouslyFocusedElement.focus();
    }
  }
}
function closeAllOpenPopovers(document2, focusPreviousElement = false, fireEvents = false) {
  let popover = topmostAutoOrHintPopover(document2);
  while (popover) {
    hidePopover(popover, focusPreviousElement, fireEvents);
    popover = topmostAutoOrHintPopover(document2);
  }
}
function closeAllOpenPopoversInList(list, focusPreviousElement = false, fireEvents = false) {
  let popover = topMostPopoverInList(list);
  while (popover) {
    hidePopover(popover, focusPreviousElement, fireEvents);
    popover = topMostPopoverInList(list);
  }
}
function hidePopoverStackUntil(endpoint, set, focusPreviousElement, fireEvents) {
  let repeatingHide = false;
  let hasRunOnce = false;
  while (repeatingHide || !hasRunOnce) {
    hasRunOnce = true;
    let lastToHide = null;
    let foundEndpoint = false;
    for (const popover of set) {
      if (popover === endpoint) {
        foundEndpoint = true;
      } else if (foundEndpoint) {
        lastToHide = popover;
        break;
      }
    }
    if (!lastToHide) return;
    while (getPopoverVisibilityState(lastToHide) === "showing" && set.size) {
      hidePopover(lastSetElement(set), focusPreviousElement, fireEvents);
    }
    if (set.has(endpoint) && lastSetElement(set) !== endpoint) {
      repeatingHide = true;
    }
    if (repeatingHide) {
      fireEvents = false;
    }
  }
}
function hideAllPopoversUntil(endpoint, focusPreviousElement, fireEvents) {
  var _a, _b;
  const document2 = endpoint.ownerDocument || endpoint;
  if (endpoint instanceof Document) {
    return closeAllOpenPopovers(document2, focusPreviousElement, fireEvents);
  }
  if ((_a = hintPopoverList.get(document2)) == null ? void 0 : _a.has(endpoint)) {
    hidePopoverStackUntil(
      endpoint,
      hintPopoverList.get(document2),
      focusPreviousElement,
      fireEvents
    );
    return;
  }
  closeAllOpenPopoversInList(
    hintPopoverList.get(document2) || /* @__PURE__ */ new Set(),
    focusPreviousElement,
    fireEvents
  );
  if (!((_b = autoPopoverList.get(document2)) == null ? void 0 : _b.has(endpoint))) {
    return;
  }
  hidePopoverStackUntil(
    endpoint,
    autoPopoverList.get(document2),
    focusPreviousElement,
    fireEvents
  );
}
var popoverPointerDownTargets = /* @__PURE__ */ new WeakMap();
function lightDismissOpenPopovers(event) {
  if (!event.isTrusted) return;
  const target = event.composedPath()[0];
  if (!target) return;
  const document2 = target.ownerDocument;
  const topMostPopover = topmostAutoOrHintPopover(document2);
  if (!topMostPopover) return;
  const ancestor = topMostClickedPopover(target);
  if (ancestor && event.type === "pointerdown") {
    popoverPointerDownTargets.set(document2, ancestor);
  } else if (event.type === "pointerup") {
    const sameTarget = popoverPointerDownTargets.get(document2) === ancestor;
    popoverPointerDownTargets.delete(document2);
    if (sameTarget) {
      hideAllPopoversUntil(ancestor || document2, false, true);
    }
  }
}
var initialAriaExpandedValue = /* @__PURE__ */ new WeakMap();
function setInvokerAriaExpanded(el, force = false) {
  if (!el) return;
  if (!initialAriaExpandedValue.has(el)) {
    initialAriaExpandedValue.set(el, el.getAttribute("aria-expanded"));
  }
  const popover = el.popoverTargetElement;
  if (popover instanceof HTMLElement && popover.popover === "auto") {
    el.setAttribute("aria-expanded", String(force));
  } else {
    const initialValue = initialAriaExpandedValue.get(el);
    if (!initialValue) {
      el.removeAttribute("aria-expanded");
    } else {
      el.setAttribute("aria-expanded", initialValue);
    }
  }
}
var ShadowRoot2 = globalThis.ShadowRoot || function() {
};
function isSupported() {
  return typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype === "object" && "popover" in HTMLElement.prototype;
}
function patchSelectorFn(object, name, mapper) {
  const original = object[name];
  Object.defineProperty(object, name, {
    value(selector) {
      return original.call(this, mapper(selector));
    }
  });
}
var nonEscapedPopoverSelector = /(^|[^\\]):popover-open\b/g;
function hasLayerSupport() {
  return typeof globalThis.CSSLayerBlockRule === "function";
}
function getStyles() {
  const useLayer = hasLayerSupport();
  return `
${useLayer ? "@layer popover-polyfill {" : ""}
  :where([popover]) {
    position: fixed;
    z-index: 2147483647;
    inset: 0;
    padding: 0.25em;
    width: fit-content;
    height: fit-content;
    border-width: initial;
    border-color: initial;
    border-image: initial;
    border-style: solid;
    background-color: canvas;
    color: canvastext;
    overflow: auto;
    margin: auto;
  }

  :where([popover]:not(.\\:popover-open)) {
    display: none;
  }

  :where(dialog[popover].\\:popover-open) {
    display: block;
  }

  :where(dialog[popover][open]) {
    display: revert;
  }

  :where([anchor].\\:popover-open) {
    inset: auto;
  }

  :where([anchor]:popover-open) {
    inset: auto;
  }

  @supports not (background-color: canvas) {
    :where([popover]) {
      background-color: white;
      color: black;
    }
  }

  @supports (width: -moz-fit-content) {
    :where([popover]) {
      width: -moz-fit-content;
      height: -moz-fit-content;
    }
  }

  @supports not (inset: 0) {
    :where([popover]) {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
${useLayer ? "}" : ""}
`;
}
var popoverStyleSheet = null;
function injectStyles(root) {
  const styles = getStyles();
  if (popoverStyleSheet === null) {
    try {
      popoverStyleSheet = new CSSStyleSheet();
      popoverStyleSheet.replaceSync(styles);
    } catch {
      popoverStyleSheet = false;
    }
  }
  if (popoverStyleSheet === false) {
    const sheet = document.createElement("style");
    sheet.textContent = styles;
    if (root instanceof Document) {
      root.head.prepend(sheet);
    } else {
      root.prepend(sheet);
    }
  } else {
    root.adoptedStyleSheets = [popoverStyleSheet, ...root.adoptedStyleSheets];
  }
}
function apply() {
  if (typeof window === "undefined") return;
  window.ToggleEvent = window.ToggleEvent || ToggleEvent;
  function rewriteSelector(selector) {
    if (selector == null ? void 0 : selector.includes(":popover-open")) {
      selector = selector.replace(
        nonEscapedPopoverSelector,
        "$1.\\:popover-open"
      );
    }
    return selector;
  }
  patchSelectorFn(Document.prototype, "querySelector", rewriteSelector);
  patchSelectorFn(Document.prototype, "querySelectorAll", rewriteSelector);
  patchSelectorFn(Element.prototype, "querySelector", rewriteSelector);
  patchSelectorFn(Element.prototype, "querySelectorAll", rewriteSelector);
  patchSelectorFn(Element.prototype, "matches", rewriteSelector);
  patchSelectorFn(Element.prototype, "closest", rewriteSelector);
  patchSelectorFn(
    DocumentFragment.prototype,
    "querySelectorAll",
    rewriteSelector
  );
  Object.defineProperties(HTMLElement.prototype, {
    popover: {
      enumerable: true,
      configurable: true,
      get() {
        if (!this.hasAttribute("popover")) return null;
        const value = (this.getAttribute("popover") || "").toLowerCase();
        if (value === "" || value == "auto") return "auto";
        if (value == "hint") return "hint";
        return "manual";
      },
      set(value) {
        if (value === null) {
          this.removeAttribute("popover");
        } else {
          this.setAttribute("popover", value);
        }
      }
    },
    showPopover: {
      enumerable: true,
      configurable: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value(options = {}) {
        showPopover(this);
      }
    },
    hidePopover: {
      enumerable: true,
      configurable: true,
      value() {
        hidePopover(this, true, true);
      }
    },
    togglePopover: {
      enumerable: true,
      configurable: true,
      value(options = {}) {
        if (typeof options === "boolean") {
          options = { force: options };
        }
        if (visibilityState.get(this) === "showing" && options.force === void 0 || options.force === false) {
          hidePopover(this, true, true);
        } else if (options.force === void 0 || options.force === true) {
          showPopover(this);
        }
        return visibilityState.get(this) === "showing";
      }
    }
  });
  const originalAttachShadow = Element.prototype.attachShadow;
  if (originalAttachShadow) {
    Object.defineProperties(Element.prototype, {
      attachShadow: {
        enumerable: true,
        configurable: true,
        writable: true,
        value(options) {
          const shadowRoot = originalAttachShadow.call(this, options);
          injectStyles(shadowRoot);
          return shadowRoot;
        }
      }
    });
  }
  const originalAttachInternals = HTMLElement.prototype.attachInternals;
  if (originalAttachInternals) {
    Object.defineProperties(HTMLElement.prototype, {
      attachInternals: {
        enumerable: true,
        configurable: true,
        writable: true,
        value() {
          const internals = originalAttachInternals.call(this);
          if (internals.shadowRoot) {
            injectStyles(internals.shadowRoot);
          }
          return internals;
        }
      }
    });
  }
  const popoverTargetAssociatedElements = /* @__PURE__ */ new WeakMap();
  function applyPopoverInvokerElementMixin(ElementClass) {
    Object.defineProperties(ElementClass.prototype, {
      popoverTargetElement: {
        enumerable: true,
        configurable: true,
        set(targetElement) {
          if (targetElement === null) {
            this.removeAttribute("popovertarget");
            popoverTargetAssociatedElements.delete(this);
          } else if (!(targetElement instanceof Element)) {
            throw new TypeError(
              `popoverTargetElement must be an element or null`
            );
          } else {
            this.setAttribute("popovertarget", "");
            popoverTargetAssociatedElements.set(this, targetElement);
          }
        },
        get() {
          if (this.localName !== "button" && this.localName !== "input") {
            return null;
          }
          if (this.localName === "input" && this.type !== "reset" && this.type !== "image" && this.type !== "button") {
            return null;
          }
          if (this.disabled) {
            return null;
          }
          if (this.form && this.type === "submit") {
            return null;
          }
          const targetElement = popoverTargetAssociatedElements.get(this);
          if (targetElement && targetElement.isConnected) {
            return targetElement;
          } else if (targetElement && !targetElement.isConnected) {
            popoverTargetAssociatedElements.delete(this);
            return null;
          }
          const root = getRootNode(this);
          const idref = this.getAttribute("popovertarget");
          if ((root instanceof Document || root instanceof ShadowRoot2) && idref) {
            return root.getElementById(idref) || null;
          }
          return null;
        }
      },
      popoverTargetAction: {
        enumerable: true,
        configurable: true,
        get() {
          const value = (this.getAttribute("popovertargetaction") || "").toLowerCase();
          if (value === "show" || value === "hide") return value;
          return "toggle";
        },
        set(value) {
          this.setAttribute("popovertargetaction", value);
        }
      }
    });
  }
  applyPopoverInvokerElementMixin(HTMLButtonElement);
  applyPopoverInvokerElementMixin(HTMLInputElement);
  const handleInvokerActivation = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    const composedPath = event.composedPath();
    const target = composedPath[0];
    if (!(target instanceof Element) || (target == null ? void 0 : target.shadowRoot)) {
      return;
    }
    const root = getRootNode(target);
    if (!(root instanceof ShadowRoot2 || root instanceof Document)) {
      return;
    }
    const invoker = composedPath.find(
      (el) => {
        var _a;
        return (_a = el.matches) == null ? void 0 : _a.call(el, "[popovertargetaction],[popovertarget]");
      }
    );
    if (invoker) {
      popoverTargetAttributeActivationBehavior(invoker);
      event.preventDefault();
      return;
    }
  };
  const onKeydown = (event) => {
    const key = event.key;
    const target = event.target;
    if (!event.defaultPrevented && target && (key === "Escape" || key === "Esc")) {
      hideAllPopoversUntil(target.ownerDocument, true, true);
    }
  };
  const addEventListeners = (root) => {
    root.addEventListener("click", handleInvokerActivation);
    root.addEventListener("keydown", onKeydown);
    root.addEventListener("pointerdown", lightDismissOpenPopovers);
    root.addEventListener("pointerup", lightDismissOpenPopovers);
  };
  addEventListeners(document);
  injectStyles(document);
}
if (!isSupported()) apply();

// node_modules/micromodal/dist/micromodal.es.js
function e(e2, t2) {
  for (var o2 = 0; o2 < t2.length; o2++) {
    var n2 = t2[o2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
  }
}
function t(e2) {
  return (function(e3) {
    if (Array.isArray(e3)) return o(e3);
  })(e2) || (function(e3) {
    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e3)) return Array.from(e3);
  })(e2) || (function(e3, t2) {
    if (!e3) return;
    if ("string" == typeof e3) return o(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
    if ("Map" === n2 || "Set" === n2) return Array.from(e3);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return o(e3, t2);
  })(e2) || (function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  })();
}
function o(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var o2 = 0, n2 = new Array(t2); o2 < t2; o2++) n2[o2] = e2[o2];
  return n2;
}
var n;
var i;
var a;
var r;
var s;
var l = (n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], i = (function() {
  function o2(e2) {
    var n2 = e2.targetModal, i3 = e2.triggers, a3 = void 0 === i3 ? [] : i3, r3 = e2.onShow, s2 = void 0 === r3 ? function() {
    } : r3, l2 = e2.onClose, c = void 0 === l2 ? function() {
    } : l2, d = e2.openTrigger, u = void 0 === d ? "data-micromodal-trigger" : d, f = e2.closeTrigger, h = void 0 === f ? "data-micromodal-close" : f, v = e2.openClass, g = void 0 === v ? "is-open" : v, m = e2.disableScroll, b = void 0 !== m && m, y = e2.disableFocus, p = void 0 !== y && y, w = e2.awaitCloseAnimation, E = void 0 !== w && w, k = e2.awaitOpenAnimation, M = void 0 !== k && k, A = e2.debugMode, C = void 0 !== A && A;
    !(function(e3, t2) {
      if (!(e3 instanceof t2)) throw new TypeError("Cannot call a class as a function");
    })(this, o2), this.modal = "string" == typeof n2 ? document.getElementById(n2) : n2, this.config = { debugMode: C, disableScroll: b, openTrigger: u, closeTrigger: h, openClass: g, onShow: s2, onClose: c, awaitCloseAnimation: E, awaitOpenAnimation: M, disableFocus: p }, a3.length > 0 && this.registerTriggers.apply(this, t(a3)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  var i2, a2, r2;
  return i2 = o2, (a2 = [{ key: "registerTriggers", value: function() {
    for (var e2 = this, t2 = arguments.length, o3 = new Array(t2), n2 = 0; n2 < t2; n2++) o3[n2] = arguments[n2];
    o3.filter(Boolean).forEach((function(t3) {
      t3.addEventListener("click", (function(t4) {
        return e2.showModal(t4);
      }));
    }));
  } }, { key: "showModal", value: function() {
    var e2 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
    if (this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add(this.config.openClass), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.awaitOpenAnimation) {
      var o3 = function t3() {
        e2.modal.removeEventListener("animationend", t3, false), e2.setFocusToFirstNode();
      };
      this.modal.addEventListener("animationend", o3, false);
    } else this.setFocusToFirstNode();
    this.config.onShow(this.modal, this.activeElement, t2);
  } }, { key: "closeModal", value: function() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t2 = this.modal;
    if (this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.config.onClose(this.modal, this.activeElement, e2), this.config.awaitCloseAnimation) {
      var o3 = this.config.openClass;
      this.modal.addEventListener("animationend", (function e3() {
        t2.classList.remove(o3), t2.removeEventListener("animationend", e3, false);
      }), false);
    } else t2.classList.remove(this.config.openClass);
  } }, { key: "closeModalByIdOrElement", value: function(e2) {
    this.modal = "string" == typeof e2 ? document.getElementById(e2) : e2, this.modal && this.closeModal();
  } }, { key: "scrollBehaviour", value: function(e2) {
    if (this.config.disableScroll) {
      var t2 = document.querySelector("body");
      switch (e2) {
        case "enable":
          Object.assign(t2.style, { overflow: "" });
          break;
        case "disable":
          Object.assign(t2.style, { overflow: "hidden" });
      }
    }
  } }, { key: "addEventListeners", value: function() {
    this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown);
  } }, { key: "removeEventListeners", value: function() {
    this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown);
  } }, { key: "onClick", value: function(e2) {
    (e2.target.hasAttribute(this.config.closeTrigger) || e2.target.parentNode.hasAttribute(this.config.closeTrigger)) && (e2.preventDefault(), e2.stopPropagation(), this.closeModal(e2));
  } }, { key: "onKeydown", value: function(e2) {
    27 === e2.keyCode && this.closeModal(e2), 9 === e2.keyCode && this.retainFocus(e2);
  } }, { key: "getFocusableNodes", value: function() {
    var e2 = this.modal.querySelectorAll(n);
    return Array.apply(void 0, t(e2));
  } }, { key: "setFocusToFirstNode", value: function() {
    var e2 = this;
    if (!this.config.disableFocus) {
      var t2 = this.getFocusableNodes();
      if (0 !== t2.length) {
        var o3 = t2.filter((function(t3) {
          return !t3.hasAttribute(e2.config.closeTrigger);
        }));
        o3.length > 0 && o3[0].focus(), 0 === o3.length && t2[0].focus();
      }
    }
  } }, { key: "retainFocus", value: function(e2) {
    var t2 = this.getFocusableNodes();
    if (0 !== t2.length) if (t2 = t2.filter((function(e3) {
      return null !== e3.offsetParent;
    })), this.modal.contains(document.activeElement)) {
      var o3 = t2.indexOf(document.activeElement);
      e2.shiftKey && 0 === o3 && (t2[t2.length - 1].focus(), e2.preventDefault()), !e2.shiftKey && t2.length > 0 && o3 === t2.length - 1 && (t2[0].focus(), e2.preventDefault());
    } else t2[0].focus();
  } }]) && e(i2.prototype, a2), r2 && e(i2, r2), o2;
})(), a = null, r = function(e2) {
  if ("string" == typeof id ? !document.getElementById(e2) : !e2) return console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(e2, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(e2, '"></div>')), false;
}, s = function(e2, t2) {
  if ((function(e3) {
    e3.length <= 0 && (console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'));
  })(e2), !t2) return true;
  for (var o2 in t2) r(o2);
  return true;
}, { init: function(e2) {
  var o2 = Object.assign({}, { openTrigger: "data-micromodal-trigger" }, e2), n2 = t(document.querySelectorAll("[".concat(o2.openTrigger, "]"))), r2 = (function(e3, t2) {
    var o3 = [];
    return e3.forEach((function(e4) {
      var n3 = e4.attributes[t2].value;
      void 0 === o3[n3] && (o3[n3] = []), o3[n3].push(e4);
    })), o3;
  })(n2, o2.openTrigger);
  if (true !== o2.debugMode || false !== s(n2, r2)) for (var l2 in r2) {
    var c = r2[l2];
    o2.targetModal = l2, o2.triggers = t(c), a = new i(o2);
  }
}, show: function(e2, t2) {
  var o2 = t2 || {};
  o2.targetModal = e2, true === o2.debugMode && false === r(e2) || (a && a.removeEventListeners(), (a = new i(o2)).showModal());
}, close: function(e2) {
  e2 ? a.closeModalByIdOrElement(e2) : a.closeModal();
} });
"undefined" != typeof window && (window.MicroModal = l);
var micromodal_es_default = l;

// src/assets/js/main.js
init_slider();

// src/assets/js/details.js
var WorkDetails = class {
  /**
   * @constructor
   */
  constructor() {
    this.worksSection = document.querySelector(".p-portfolio__works");
    this.workList = document.querySelector(".p-portfolio__work-list");
    this.workCards = document.querySelectorAll(".p-portfolio__work-card");
    this.currentCard = null;
    this.detailsBlock = null;
    this.workData = [];
    if (!this.worksSection || !this.workList) {
      return;
    }
    this.init();
  }
  /**
   * 初期化
   * @private
   */
  init() {
    this.extractWorkData();
    this.workCards.forEach((card, index) => {
      const trigger = card.querySelector(".p-portfolio__work-trigger");
      if (trigger) {
        trigger.addEventListener("click", (e2) => {
          e2.preventDefault();
          e2.stopPropagation();
          this.toggleDetails(index, card);
        });
      }
    });
    this.escapeHandler = (e2) => {
      if (e2.key === "Escape" && this.currentCard !== null) {
        this.close();
      }
    };
    document.addEventListener("keydown", this.escapeHandler);
  }
  /**
   * 各カードからデータを抽出
   * @private
   */
  extractWorkData() {
    this.workCards.forEach((card) => {
      const img = card.querySelector(".p-portfolio__work-trigger img");
      const title = card.querySelector(".p-portfolio__work-title");
      if (img && title) {
        const meta = card.dataset.workMeta || "";
        const tagsJson = card.dataset.workTags || "[]";
        const tags = JSON.parse(tagsJson);
        const summary = card.dataset.workSummary || "";
        const description = card.dataset.workDescription || "";
        const imagesJson = card.dataset.workImages || "[]";
        const images = JSON.parse(imagesJson);
        this.workData.push({
          image: img.src,
          alt: img.alt,
          title: title.textContent,
          meta,
          tags,
          summary,
          description,
          images: images.length > 0 ? images : [img.src]
        });
      }
    });
  }
  /**
   * 詳細ブロックをトグル
   * @param {number} index - ワークのインデックス
   * @param {HTMLElement} card - クリックされたカード要素
   * @private
   */
  toggleDetails(index, card) {
    if (this.currentCard === card && this.detailsBlock) {
      this.close();
      return;
    }
    this.removeDetailsBlock();
    this.insertDetailsBlock(index, card);
  }
  /**
   * グリッドの列数を取得
   * @returns {number} 列数
   * @private
   */
  getGridColumnCount() {
    const computedStyle = window.getComputedStyle(this.workList);
    const gridTemplateColumns = computedStyle.gridTemplateColumns;
    const repeatMatch = gridTemplateColumns.match(/repeat\((\d+)/);
    if (repeatMatch) {
      return parseInt(repeatMatch[1], 10);
    }
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 1024) {
      return 3;
    } else if (viewportWidth >= 768) {
      return 2;
    }
    return 1;
  }
  /**
   * 行番号を計算
   * @param {number} cardIndex - カードのインデックス
   * @param {number} columnCount - グリッドの列数
   * @returns {number} 行番号（0始まり）
   * @private
   */
  getRowNumber(cardIndex, columnCount) {
    return Math.floor(cardIndex / columnCount);
  }
  /**
   * 次の行の開始位置（カードのインデックス）を取得
   * @param {number} rowNumber - 現在の行番号
   * @param {number} columnCount - グリッドの列数
   * @returns {number} 次の行の開始位置のカードインデックス
   * @private
   */
  getNextRowStartCardIndex(rowNumber, columnCount) {
    const nextRowStart = (rowNumber + 1) * columnCount;
    const totalCards = this.workCards.length;
    return nextRowStart >= totalCards ? totalCards - 1 : nextRowStart;
  }
  /**
   * 詳細ブロック要素を作成
   * @param {string} detailsHTML - 詳細ブロックのHTML
   * @returns {HTMLElement} 詳細ブロック要素
   * @private
   */
  createDetailsElement(detailsHTML) {
    const detailsElement = document.createElement("li");
    detailsElement.className = "p-portfolio__work-details-block";
    detailsElement.innerHTML = detailsHTML;
    return detailsElement;
  }
  /**
   * 現在の行の最後のカードを取得
   * @param {number} cardIndex - クリックされたカードのインデックス
   * @returns {HTMLElement} 現在の行の最後のカード要素
   * @private
   */
  getCurrentRowLastCard(cardIndex) {
    const columnCount = this.getGridColumnCount();
    const rowNumber = this.getRowNumber(cardIndex, columnCount);
    const currentRowLastIndex = (rowNumber + 1) * columnCount - 1;
    const totalCards = this.workCards.length;
    const lastCardIndex = currentRowLastIndex >= totalCards ? totalCards - 1 : currentRowLastIndex;
    return this.workCards[lastCardIndex];
  }
  /**
   * 詳細ブロックを挿入
   * @param {number} index - ワークのインデックス
   * @param {HTMLElement} card - クリックされたカード要素
   * @private
   */
  insertDetailsBlock(index, card) {
    const work = this.workData[index];
    if (!work) {
      return;
    }
    const detailsHTML = this.createDetailsHTML(work, index);
    const detailsElement = this.createDetailsElement(detailsHTML);
    const currentRowLastCard = this.getCurrentRowLastCard(index);
    currentRowLastCard.insertAdjacentElement("afterend", detailsElement);
    this.currentCard = card;
    this.detailsBlock = detailsElement;
    this.setupDetailsBlockEvents(detailsElement, work, index);
  }
  /**
   * 詳細ブロックのイベントリスナーとスライダーを設定
   * @param {HTMLElement} detailsElement - 詳細ブロック要素
   * @param {Object} work - ワークデータ
   * @param {number} index - ワークのインデックス
   * @private
   */
  setupDetailsBlockEvents(detailsElement, work, index) {
    const closeButton = detailsElement.querySelector(".p-portfolio__work-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.close();
      });
    }
    if (work.images.length > 1) {
      this.initSlider(detailsElement);
    }
  }
  /**
   * 詳細ブロックのHTMLを生成
   * @param {Object} work - ワークデータ
   * @param {number} index - ワークのインデックス
   * @returns {string} HTML文字列
   * @private
   */
  createDetailsHTML(work, index) {
    const sliderHTML = work.images.length > 1 ? `
			<div class="c-slider" data-slider="work-details-${index}">
				<div class="c-slider__viewport">
					<div class="c-slider__track">
						${work.images.map((imgSrc, imgIndex) => `
							<div class="c-slider__slide">
								<img src="${imgSrc}" alt="${work.alt} - \u753B\u50CF${imgIndex + 1}" />
							</div>
						`).join("")}
					</div>
				</div>
				<button class="c-slider__button c-slider__button--prev" aria-label="\u524D\u306E\u753B\u50CF" data-slider-prev>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
				<button class="c-slider__button c-slider__button--next" aria-label="\u6B21\u306E\u753B\u50CF" data-slider-next>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
				<div class="c-slider__pagination" aria-label="\u30B9\u30E9\u30A4\u30C0\u30FC\u306E\u30DA\u30FC\u30B8\u30CD\u30FC\u30B7\u30E7\u30F3"></div>
			</div>
		` : `
			<div class="p-portfolio__work-details-image">
				<img src="${work.images[0]}" alt="${work.alt}" />
			</div>
		`;
    return `
			<div class="p-portfolio__work-details-content">
				<button class="p-portfolio__work-close" aria-label="\u8A73\u7D30\u3092\u9589\u3058\u308B">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<div class="p-portfolio__work-details-inner">
					<div class="p-portfolio__work-details-grid">
						${sliderHTML}
						<div class="p-portfolio__work-details-text">
							<h2 class="p-portfolio__work-details-title">${work.title}</h2>
							<hr class="p-portfolio__work-details-divider" />
							${work.meta ? `<p class="p-portfolio__work-details-meta">${work.meta}</p>` : ""}
							${work.tags.length > 0 ? `
								<div class="p-portfolio__work-details-tags">
									${work.tags.map((tag) => `<span class="c-badge c-badge--small">${tag}</span>`).join("")}
								</div>
							` : ""}
							${work.summary ? `<p class="p-portfolio__work-details-summary">${work.summary}</p>` : ""}
							${work.description ? `<p class="p-portfolio__work-details-description">${work.description}</p>` : ""}
						</div>
					</div>
				</div>
			</div>
		`;
  }
  /**
   * スライダーを初期化
   * @param {HTMLElement} container - コンテナ要素
   * @private
   */
  initSlider(container) {
    const sliderElement = container.querySelector("[data-slider]");
    if (!sliderElement) return;
    Promise.resolve().then(() => (init_slider(), slider_exports)).then(({ ImageSlider: ImageSlider2, sliderInstances: sliderInstances2 }) => {
      setTimeout(() => {
        if (!sliderInstances2.has(sliderElement)) {
          const instance = new ImageSlider2(sliderElement);
          sliderInstances2.set(sliderElement, instance);
        }
      }, 0);
    });
  }
  /**
   * 詳細ブロックまでスクロール
   * @param {HTMLElement} element - 詳細ブロック要素
   * @private
   */
  scrollToDetails(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = scrollTop + rect.top - 20;
    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  }
  /**
   * 既存の詳細ブロックを削除
   * @private
   */
  removeDetailsBlock() {
    if (this.detailsBlock) {
      this.detailsBlock.remove();
      this.detailsBlock = null;
    }
    this.currentCard = null;
  }
  /**
   * 閉じる
   * @public
   */
  close() {
    this.removeDetailsBlock();
  }
  /**
   * クリーンアップ
   * @public
   */
  destroy() {
    this.close();
    document.removeEventListener("keydown", this.escapeHandler);
  }
};
function initWorkDetails() {
  const workList = document.querySelector(".p-portfolio__work-list");
  if (!workList) {
    return;
  }
  new WorkDetails();
}
function init() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWorkDetails);
  } else {
    setTimeout(initWorkDetails, 0);
  }
}
init();

// src/assets/js/main.js
micromodal_es_default.init({
  disableScroll: true
});
//# sourceMappingURL=main.js.map
