import { createSignal, createEffect } from "solid-js";

function StateStyler(mounter, styles) {
    const [style, setStyle] = createSignal(undefined);

    if (styles.mounting === undefined) {
        styles.mounting = styles.mounted;
    }

    createEffect(() => {
        const state = mounter.state();
        if (state === 0 || state === 1 || state === 4) {
            setStyle({ ...styles.constant, ...styles.unmounted });
        } else if (state === 2) {
            setStyle({ ...styles.constant, ...styles.mounting });
        } else { // state == 3
            setStyle({ ...styles.constant, ...styles.mounted });
        }
    });

    return style;
}

export default StateStyler;
