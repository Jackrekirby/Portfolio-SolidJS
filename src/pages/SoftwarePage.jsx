import styles from "./SoftwarePage.module.css";
import Boxes from "../components/Boxes";
import { useColor } from "../components/ColorProvider";
import {
  IconGithub,
  IconTechStack,
  IconWebsite,
} from "../components/FontAwesome";
import { mounterFncs, useMounter } from "../components/MounterProvider";

function SoftwarePage() {
  const mounters = useMounter();
  const colorer = useColor();
  const { mount, dismount } = mounterFncs(mounters);

  function PillList({ items }) {
    return (
      <div class={styles.List}>
        <For each={items}>
          {(item) => (
            <p style={{ "background-color": colorer.fhsla(0.8) }}>{item}</p>
          )}
        </For>
      </div>
    );
  }

  function PillLink({ href, name }) {
    return (
      <div class={styles.List}>
        <a
          style={{ "background-color": colorer.fhsla(0.8) }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </div>
    );
  }

  return (
    <Boxes stateholder={mounters.softPage}>
      <div class={styles.SoftwareProjects}>
        <h1>Projects</h1>
        <div class={styles.Grid}>
          <div class={styles.Cell}>
            <div class={styles.Pills}>
              <div class={styles.Pill}>
                <IconTechStack color={colorer.fhsl} size={"xl"}></IconTechStack>
                <PillList items={["Node", "AWS S3", "MATLAB", "+"]}></PillList>
              </div>
              <div class={styles.Pill}>
                <IconWebsite color={colorer.fhsl} size={"xl"}></IconWebsite>
                <PillLink
                  href={"hychain.co.uk"}
                  name={"hychain.co.uk"}
                ></PillLink>
              </div>
            </div>
            <h2
              onClick={() => {
                dismount(["softPage"], 0);
                mount(["hychainPage"], 1);
              }}
            >
              HyChain
            </h2>
            <p class={styles.Description}>
              A collection of web-tools to model Hydrogen as an energy storage
              medium.
            </p>
          </div>
          <div class={styles.Cell}>
            <div class={styles.Pills}>
              <div class={styles.Pill}>
                <IconTechStack color={colorer.fhsl} size={"xl"}></IconTechStack>
                <PillList
                  items={["Express.js", "Rust", "WASM", "+"]}
                ></PillList>
              </div>
              <div class={styles.Pill}>
                <IconWebsite color={colorer.fhsl} size={"xl"}></IconWebsite>
                <PillLink
                  href={"heatmyhome.ninja"}
                  name={"heatmyhome.ninja"}
                ></PillLink>
              </div>
              <div class={styles.Pill}>
                <IconGithub color={colorer.fhsl} size={"xl"}></IconGithub>
                <PillLink
                  href={"github.com/Jackrekirby/HeatMyHome-Simulator-Dev"}
                  name={"GitHub Repository"}
                ></PillLink>
              </div>
            </div>
            <h2
              onClick={() => {
                dismount(["softPage"], 0);
                mount(["heatmyhomePage"], 1);
              }}
            >
              Heat My Home
            </h2>
            <p class={styles.Description}>
              A web tool for consumers to compare heating technologies by
              simulation.
            </p>
          </div>
          <div class={styles.Cell}>
            <div class={styles.Pills}>
              <div class={styles.Pill}>
                <IconTechStack color={colorer.fhsl} size={"xl"}></IconTechStack>
                <PillList items={["C++", "MATLAB", "JSON"]}></PillList>
              </div>
              <div class={styles.Pill}>
                <IconGithub color={colorer.fhsl} size={"xl"}></IconGithub>
                <PillLink
                  href={"github.com/Jackrekirby/AcCoRD2"}
                  name={"GitHub Repository"}
                ></PillLink>
              </div>
            </div>
            <h2
              onClick={() => {
                dismount(["softPage"], 0);
                mount(["accordPage"], 1);
              }}
            >
              AcCoRD 2.0
            </h2>
            <p class={styles.Description}>
              A command-line program used to simulate molecular communication in
              virtual 3D environments.
            </p>
          </div>
          <div class={styles.Cell}>
            <div class={styles.Pills}>
              <div class={styles.Pill}>
                <IconTechStack color={colorer.fhsl} size={"xl"}></IconTechStack>
                <PillList
                  items={["Java", "C++", "React", "Rust", "+"]}
                ></PillList>
              </div>
            </div>
            <h2
              onClick={() => {
                dismount(["softPage"], 0);
                mount(["personalPage"], 1);
              }}
            >
              Personal
            </h2>
            <p class={styles.Description}>
              A range of small personal projects.
            </p>
          </div>
        </div>
      </div>
    </Boxes>
  );
}

export default SoftwarePage;
