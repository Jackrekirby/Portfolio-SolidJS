import { createSignal, createEffect } from "solid-js";

function Styler(stateHolder, mountedStyles, unmountedStyles, constStyles) {
  const makeStyle = () => ({
    ...constStyles,
    ...(() =>
      stateHolder.isStyleMounted() ? mountedStyles : unmountedStyles)(),
  });

  const [style, setStyle] = createSignal(makeStyle());

  createEffect(() => {
    setStyle(makeStyle());
  });

  return style;
}

export default Styler;
