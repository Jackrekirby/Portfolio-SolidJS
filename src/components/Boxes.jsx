import styles from "./Boxes.module.css";
import { createEffect, createSignal } from "solid-js";
import StateStyler from "../functions/StateStyler";
import { useColor } from "./ColorProvider";

function Boxes({ stateholder, children }) {
  const colorer = useColor();
  const [overflow, setOverflow] = createSignal(undefined);

  const styler = StateStyler(stateholder, {
    unmounted: {
      opacity: 0,
      transform: "translateY(100vh)",
      "overflow-y": "hidden",
    },
    mounting: {
      opacity: 1,
      transform: "translateY(0vh)",
      "overflow-y": "hidden",
    },
    mounted: { opacity: 1, transform: "translateY(0vh)", "overflow-y": "auto" },
    constant: { color: colorer.dark() },
  });

  let element;

  const either = (x, a, b) => x == a || x == b;

  createEffect(() => {
    if (either(stateholder.state(), 1, 4)) {
      // console.log("boxes-overflow", element.scrollHeight, window.innerHeight);
      setOverflow(element.scrollHeight > window.innerHeight);
    }
  });

  return (
    <Show when={stateholder.isMounted()}>
      <div
        ref={element}
        class={styles.Boxes}
        style={{
          ...styler(),
          "padding-right":
            overflow() && either(stateholder.state(), 2, 4)
              ? "1rem"
              : undefined,
        }}
      >
        {children}
      </div>
    </Show>
  );
}

export default Boxes;
