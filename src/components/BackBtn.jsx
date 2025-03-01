import styles from "./BackBtn.module.css";
import Styler from "../functions/Styler";
import { IconCircleArrowLeft } from "./FontAwesome";
// import { createSignal, createEffect } from "solid-js";
import { useColor } from "./ColorProvider";

function BackBtn({ stateholder, name, onClick, order, width }) {
  const colorer = useColor();
  // let element;

  const styler = Styler(
    stateholder,
    { opacity: 1 },
    { opacity: 0 },
    {
      color: colorer.dark(),
      transform: `translateX(${8 * order}rem)`,
    }
  );

  // const [width, setWidth] = createSignal();

  // createEffect(() => {
  //   if (
  //     stateholder.state() == 1 ||
  //     (width() === undefined && element !== undefined)
  //   ) {
  //     setWidth({ width: `${element.scrollWidth + 10}px` });
  //     // console.log("back-btn", element.scrollWidth);
  //   }
  // });

  // return (
  //   <Show when={stateholder.isMounted()}>
  //     <div class={styles.Button} onClick={onClick} style={styler()}>
  //       <p style={width()}>{name}</p>
  //       <IconCircleArrowLeft size="m"></IconCircleArrowLeft>
  //       <p ref={element} style={width()}>
  //         {name}
  //       </p>
  //     </div>
  //   </Show>
  // );

  return (
    <Show when={stateholder.isMounted()}>
      <div class={styles.Button} onClick={onClick} style={styler()}>
        <p style={{ width }}>{name}</p>
        <IconCircleArrowLeft size="m"></IconCircleArrowLeft>
        <p style={{ width }}>{name}</p>
      </div>
    </Show>
  );
}

export default BackBtn;
