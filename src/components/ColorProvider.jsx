import { createContext, useContext } from "solid-js";

const ColorContext = createContext();

export function ColorProvider(props) {
  if (props.hsl === undefined) {
    console.warn("no color given to provider");
    props.hsl = { h: 72, s: 99, l: 47 }; // lime
  }

  const value = {
    hsl: props.hsl,
    fhsl: fhsl(props.hsl),
    dhsl: ({ dh, ds, dl }) => dhsl(props.hsl, dh, ds, dl),
    ohsl: ({ oh, os, ol }) => ohsl(props.hsl, oh, os, ol),
    fhsla: (a) => hsla(props.hsl, a),
  };

  return (
    <ColorContext.Provider value={value}>
      {props.children}
    </ColorContext.Provider>
  );
}

function fhsl({ h, s, l }) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function dhsl({ h, s, l }, dh = 0, ds = 0, dl = 0) {
  return fhsl(h + dh, s + ds, l + dl);
}

function ohsl({ h, s, l }, oh = undefined, os = undefined, ol = undefined) {
  const f = (original, override) =>
    override === undefined ? original : override;
  return fhsl(f(h, oh), f(s, os), f(l, ol));
}

function hsla({ h, s, l }, a) {
  return `hsl(${h}, ${s}%, ${l}%, ${a})`;
}

export function useColor() {
  return useContext(ColorContext);
}
