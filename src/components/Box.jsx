import styles from "./Box.module.css";
import StateStyler from "../functions/StateStyler";
import { useColor } from "./ColorProvider";

function Box({ stateHolder, isVertical, children }) {
  const colorer = useColor();
  const prestyler = {};

  if (isVertical) {
    prestyler.mounted = { height: "100%" };
    prestyler.unmounted = { height: "0%" };
  } else {
    prestyler.mounted = { width: "100%" };
    prestyler.unmounted = { width: "0%" };
  }

  const styler = StateStyler(stateHolder, {
    ...prestyler,
    constant: { "background-color": colorer.fhsl },
  });

  return (
    <Show when={stateHolder.isMounted()}>
      <div class={styles.HomeBox} style={styler()}>
        {children}
      </div>
    </Show>
  );
}

export default Box;
