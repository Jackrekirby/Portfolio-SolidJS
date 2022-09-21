import { createSignal, createEffect } from "solid-js";

// mounting steps
// unmounted with unmounted styles = 0
// mounted with unmounted styles = 1
// mounted with mounting styles = 2
// mounted with mounted styles = 3

// dismounting steps
// mounted with mounted styles = 3
// mounted with unmounting styles = 4       // 1 and 4 equal in magnitude opposite in direction
// mounted with unmounted styles = 5        // 5 occurs at same time as 0
// unmounted with unmounted styles = 0

function Mounter(isInitMounted) {
  const [currentState, setCurrentState] = createSignal(isInitMounted ? 3 : 0);
  const [isTargetMounted, setIsTargetMounted] = createSignal(isInitMounted);

  createEffect(() => {
    if (!isTargetMounted() && currentState() === 3) {
      setCurrentState(4);
      setTimeout(() => {
        setCurrentState(0);
      }, 1000);
    } else if (isTargetMounted() && currentState() === 0) {
      setCurrentState(1);
      setTimeout(() => {
        setCurrentState(2);

        setTimeout(() => {
          setCurrentState(3);
        }, 1000);
      }, 100);
    }
  });

  return {
    state: currentState,
    setMount: setIsTargetMounted,
    getMount: isTargetMounted,
    isMounted: () => currentState() > 0,
    isStyleMounted: () => currentState() === 2 || currentState() === 3,
    isFullyMounted: () => currentState() === 3,
  };
}

export default Mounter;
