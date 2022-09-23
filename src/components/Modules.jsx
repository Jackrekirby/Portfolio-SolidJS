import styles from "./Modules.module.css";
import { useColor } from "./ColorProvider";

function Modules({ modules }) {
  const colorer = useColor();

  const styleGen = () => {
    const rotation = Math.floor(-10 + 20 * Math.random());
    const invert = Math.random() > 0.6;

    const transform = `rotate(${rotation}deg)`;
    if (invert) {
      return {
        transform,
        color: "white",
        "background-color": colorer.fhsla(1.0),
      };
    } else {
      return {
        transform,
        color: colorer.fhsla(1.0),
        "background-color": colorer.fhsla(0.2),
      };
    }
  };

  return (
    <div class={styles.Modules}>
      {modules.map((module, i) => {
        return <p style={styleGen()}>{module}</p>;
      })}
    </div>
  );
}

export default Modules;
