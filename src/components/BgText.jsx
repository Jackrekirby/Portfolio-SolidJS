import StateStyler from "../functions/StateStyler";
import styles from "./BgText.module.css";

function BgTextInner({ text, repeat, style }) {
  const seperator = "&ensp;";

  const generate = (list, size) => {
    let s = "";
    let index;
    const randSpace = () =>
      seperator.repeat(2 + Math.floor(Math.random() * 15));

    const ranIndex = () => {
      let j = index;
      while (j === index) {
        j = Math.floor(Math.random() * list.length);
      }
      return j;
    };

    for (let i = 0; i < size; ++i) {
      index = ranIndex();
      s += list[index] + randSpace();
    }
    return s;
  };

  const string = generate(text, repeat);

  // (text.join(seperator) + seperator).repeat(repeat)

  return (
    <div class={styles.BgText} style={style()}>
      <p innerHTML={string}></p>
    </div>
  );
}

function BgText({ stateHolder, text }) {
  const styler = StateStyler(stateHolder, {
    mounted: { opacity: 1 },
    unmounted: { opacity: 0 },
  });

  return (
    <Show when={stateHolder.isMounted()}>
      <BgTextInner text={text} repeat={5000} style={styler}></BgTextInner>
    </Show>
  );
}

export default BgText;
