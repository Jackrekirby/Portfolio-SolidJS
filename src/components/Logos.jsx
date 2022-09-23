import styles from "./Logos.module.css";

function Logos({ logos }) {
  return (
    <div class={styles.Logos}>
      <For each={logos}>
        {(logo) => {
          return <img src={`./src/assets/logos/${logo}.png`} alt=""></img>;
        }}
      </For>
    </div>
  );
}

export default Logos;
