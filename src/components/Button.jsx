import StateStyler from "../functions/StateStyler";
import styles from "./Button.module.css";
import { useColor } from "./ColorProvider";

function ButtonInner({ children, onClick, hsl, style, duration, delay }) {
  const colorer = useColor();

  // const borderStyle = {
  //   duration: `${5 + Math.random() * 3}s`,
  //   delay: `${1 + 3 * Math.random()}s`,
  // };

  return (
    <div
      class={styles.Button}
      onClick={onClick}
      style={style === undefined ? {} : style()}
    >
      <div
        class={styles.Border}
        style={{ "animation-duration": duration, "animation-delay": delay }}
      ></div>
      <div
        class={styles.Inner}
        style={{
          "background-color": colorer.fhsla(0.5),
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Button({ stateHolder, onClick, hsl, children }) {
  const styler = StateStyler(stateHolder, {
    mounted: { opacity: 1 },
    unmounted: { opacity: 0 },
  });

  return (
    <Show when={stateHolder.isMounted()}>
      <ButtonInner
        onClick={onClick}
        hsl={hsl}
        style={styler}
        duration={"5s"}
        delay={"3s"}
      >
        {children}
      </ButtonInner>
    </Show>
  );
}

export default Button;
