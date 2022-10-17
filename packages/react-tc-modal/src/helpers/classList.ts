// this helper can add/remove node classnames
// and provides saving classname while 2+ modals are opening and closing
// based on https://github.com/reactjs/react-modal/blob/master/src/helpers/classList.js

const classPoll = {};

const incrementReference = (poll: Record<string, number>, className: string) => {
  if (!poll[className]) {
    poll[className] = 0;
  }

  poll[className] += 1;
  return className;
};

const decrementReference = (poll: Record<string, number>, className: string) => {
  if (poll[className]) {
    poll[className] -= 1;
  }
  return className;
};

const trackClass = (classListRef: Element['classList'], poll: Record<string, number>, classes: string[]) => {
  classes.forEach((className) => {
    incrementReference(poll, className);
    classListRef.add(className);
  });
};

const untrackClass = (classListRef: Element['classList'], poll: Record<string, number>, classes: string[]) => {
  classes.forEach((className) => {
    decrementReference(poll, className);

    if (poll[className] === 0) {
      classListRef.remove(className);
    }
  });
};

export const add = (element: HTMLElement, classString: string) => trackClass(
  element.classList,
  classPoll,
  classString.split(' '),
);

export const remove = (element: HTMLElement, classString: string) => untrackClass(
  element.classList,
  classPoll,
  classString.split(' '),
);
