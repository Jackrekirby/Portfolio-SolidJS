import styles from "./Box2.module.css";
import { useColor } from "./ColorProvider";

function Box2({ title, children }) {
  const colorer = useColor();

  return (
    <div class={styles.Box}>
      <h1 style={{ color: colorer.dark() }}>{title}</h1>
      <div class={styles.Inner}>{children}</div>
    </div>
  );
}

export default Box2;
