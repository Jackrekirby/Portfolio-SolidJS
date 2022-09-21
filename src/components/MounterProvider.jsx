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

function setMount(keys, ticks, state) {
  const mounters = useContext(MounterContext);

  setTimeout(() => {
    for (const key of keys) {
      mounters[key].setMount(state);
    }
  }, ticks * 1100);
}

export function mount(keys, ticks) {
  setMount(keys, ticks, true);
}

export function dismount(keys, ticks) {
  setMount(keys, ticks, false);
}

export function useMounter() {
  return useContext(MounterContext);
}
