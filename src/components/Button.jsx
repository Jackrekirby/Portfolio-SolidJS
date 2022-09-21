import styles from "./Button.module.css";

function Button({ children, onClick, hsl, style, duration, delay }) {
  const borderStyle = {
    duration: `${5 + Math.random() * 3}s`,
    delay: `${1 + 3 * Math.random()}s`,
  };

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
          "background-color": `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 0.5)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Button;
