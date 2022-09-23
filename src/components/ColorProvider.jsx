import { createContext, useContext } from "solid-js";

const ColorContext = createContext();

const clamp = (value, max) => Math.min(Math.max(0, value), max);

export function ColorProvider(props) {
  const value = {
    light: (alpha) =>
      fhsla(props.hue, props.saturation, props.lightness, alpha),
    dark: (alpha) =>
      fhsla(props.hue, props.saturation, props.lightness - 20, alpha),
    // hsl: props.hsl,
    // fhsl: fhsl(props.hsl),
    // dhsl: ({ dh, ds, dl }) => dhsl(props.hsl, dh, ds, dl),
    // ohsl: ({ oh, os, ol }) => ohsl(props.hsl, oh, os, ol),
    // fhsla: (a) => hsla(props.hsl, a),
  };

  return (
    <ColorContext.Provider value={value}>
      {props.children}
    </ColorContext.Provider>
  );
}

function fhsla(h, s, l, a) {
  if (a === undefined) {
    return `hsl(${clamp(h, 255)}, ${clamp(s, 100)}%, ${clamp(l, 100)}%)`;
  } else {
    return `hsla(${clamp(h, 255)}, ${clamp(s, 100)}%, ${clamp(
      l,
      100
    )}%, ${clamp(a, 1)})`;
  }
}

// function dhsl({ h, s, l }, dh, ds, dl) {
//   const f = (x) => (x === undefined ? 0 : x);
//   return fhsl({ h: h + f(dh), s: s + f(ds), l: l + f(dl) });
// }

// function ohsl({ h, s, l }, oh = undefined, os = undefined, ol = undefined) {
//   const f = (original, override) =>
//     override === undefined ? original : override;
//   return fhsl(f(h, oh), f(s, os), f(l, ol));
// }

// function hsla({ h, s, l }, a) {
//   return `hsl(${h}, ${s}%, ${l}%, ${a})`;
// }

export function useColor() {
  return useContext(ColorContext);
}
