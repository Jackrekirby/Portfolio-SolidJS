import { Icon } from "./FontAwesome";
import HyperLink from "./HyperLink";
import styles from "./Links.module.css";

function Links({ links }) {
  // links = [{href: '', name: '', icon: ''}]
  return (
    <div class={styles.Links}>
      <For each={links}>
        {(link) => {
          return (
            <div class={styles.Link}>
              <Icon name={link.icon} size={"2xl"}></Icon>
              <HyperLink href={link.href}>{link.name}</HyperLink>
            </div>
          );
        }}
      </For>
    </div>
  );
}

export default Links;
