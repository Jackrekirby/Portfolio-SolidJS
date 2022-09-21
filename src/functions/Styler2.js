import { createSignal, createEffect } from "solid-js";

function Styler2(stateholder, unmountedStyles, mountingStyles, mountedStyles, constStyles) {
    const makeStyle = () => ({
        ...constStyles,
        ...(() =>
            stateholder.isStyleMounted() ? (stateholder.isFullyMounted() ? mountedStyles : mountingStyles) : unmountedStyles)(),
    });

    const [style, setStyle] = createSignal(makeStyle());

    createEffect(() => {
        setStyle(makeStyle());
    });

    return style;
}

export default Styler2;
