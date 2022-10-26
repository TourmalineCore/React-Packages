import { MutableRefObject, useEffect } from 'react';

export default function useOnClickOutside(refs: MutableRefObject<HTMLElement | null>[], handler: (event: Event) => unknown) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        if (refs.some((ref) => !ref.current)) {
          return;
        }

        // Do nothing if clicking ref's element or descendent elements
        if (refs.some((ref) => ref.current!.contains(event.target as Node | null))) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    [refs, handler],
  );
}
