export function getRelativePosition(targetElem: HTMLElement | null, parentElem: HTMLElement | null) {
  if (!targetElem || !parentElem) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
  }

  const parentPos = parentElem.getBoundingClientRect();
  const childPos = targetElem.getBoundingClientRect();

  return {
    left: childPos.left - parentPos.left,
    right: childPos.right - parentPos.right,
    top: childPos.top - parentPos.top,
    bottom: childPos.bottom - parentPos.bottom,
  };
}
