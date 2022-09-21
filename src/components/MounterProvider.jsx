import { createContext, useContext } from "solid-js";
import Mounter from "./Mounter";

const MounterContext = createContext();

export function MounterProvider(props) {
  const mounters = {};

  for (const [name, isMounted] of Object.entries(props.mounters)) {
    mounters[name] = Mounter(isMounted);
  }

  return (
    <MounterContext.Provider value={mounters}>
      {props.children}
    </MounterContext.Provider>
  );
}

function setMount(mounters, keys, ticks, state) {
  // console.log(mounters, keys, ticks, state);
  setTimeout(() => {
    for (const key of keys) {
      mounters[key].setMount(state);
    }
  }, ticks * 1100);
}

export function mounterFncs(mounters) {
  return {
    mount: (keys, ticks) => setMount(mounters, keys, ticks, true),
    dismount: (keys, ticks) => setMount(mounters, keys, ticks, false),
  };
}

export function useMounter() {
  return useContext(MounterContext);
}
