import { createSignal, createEffect, Show } from "solid-js";
import { IconArrowLeft, IconArrowRight } from "./FontAwesome";
import styles from "./SlideShow.module.css";

function SlideShow({ images }) {
  const [index, setIndex] = createSignal(0);

  return (
    <div class={styles.Slideshow}>
      <Show when={index() > 0}>
        <button
          class={styles.Back}
          onClick={() => setIndex(Math.max(0, index() - 1))}
        >
          <IconArrowLeft color={"white"} size={"m"}></IconArrowLeft>
        </button>
      </Show>

      <Show when={index() < images.length - 1}>
        <button
          class={styles.Next}
          onClick={() => setIndex(Math.min(images.length - 1, index() + 1))}
        >
          <IconArrowRight color={"white"} size={"m"}></IconArrowRight>
        </button>
      </Show>

      <div class={styles.ItemNum}>{`${index() + 1} / ${images.length}`}</div>

      <Show when={images[index()].caption !== undefined}>
        <div class={styles.Caption}>{images[index()].caption}</div>
      </Show>

      <img
        class={styles.Img}
        src={images[0].src}
        alt={images[0].alt}
        style={{ "z-index": -10 }}
      ></img>

      <For each={images}>
        {(image, key) => {
          const [offset, setOffset] = createSignal(Math.abs(index() - key()));

          createEffect(() => {
            setOffset(index() - key());
          });

          return (
            <Show when={Math.abs(offset()) <= 1}>
              <img
                src={image.src}
                class={styles.Slide}
                alt={image.alt}
                style={{
                  transform: `translateX(${[100, 0, -100][offset() + 1]}%)`,
                }}
              ></img>
            </Show>
          );
        }}
      </For>
    </div>
  );
}

export default SlideShow;
