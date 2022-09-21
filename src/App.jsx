import styles from "./App.module.css";

import { createSignal, createEffect, onMount } from "solid-js";
import Button from "./components/Button";
import BgText from "./components/BgText";
import BackBtn from "./components/BackBtn";
// import Styler from "./functions/Styler";
import {
  IconEmail,
  IconGithub,
  IconImage,
  IconLinkedin,
  IconTechStack,
  IconWebsite,
  IconYoutube,
} from "./components/FontAwesome";
// import Styler2 from "./functions/Styler2";
import SlideShow from "./components/SlideShow";
import {
  mounterFncs,
  MounterProvider,
  useMounter,
} from "./components/MounterProvider";

import * as BgTextList from "./data/BgTextLists";
import StateStyler from "./functions/StateStyler";

// function StateStyle(isMounted, mountedStyles, unmountedStyles, constStyles) {
//   const style = {
//     ...constStyles,
//     ...(() => (isMounted ? mountedStyles : unmountedStyles))(),
//   };
//   return style;
// }

// function StateStyle2(stateHolder, mountedStyles, unmountedStyles, constStyles) {
//   const makeStyle = () => ({
//     ...constStyles,
//     ...(() =>
//       stateHolder.isStyleMounted() ? mountedStyles : unmountedStyles)(),
//   });

//   const [style, setStyle] = createSignal(makeStyle());

//   createEffect(() => {
//     setStyle(makeStyle());
//   });

//   return style;
// }

function Box({ stateHolder, isVertical, color, children }) {
  const prestyler = {};

  if (isVertical) {
    prestyler.mounted = { height: "100%" };
    prestyler.unmounted = { height: "0%" };
  } else {
    prestyler.mounted = { width: "100%" };
    prestyler.unmounted = { width: "0%" };
  }

  // const makeStyle = () => {
  //   return StateStyle(
  //     stateHolder.isStyleMounted(),
  //     styler.mounted,
  //     styler.unmounted,
  //     { "background-color": color }
  //   );
  // };

  const styler2 = StateStyler(stateHolder, {
    ...prestyler,
    constant: { "background-color": color },
  });

  return (
    <Show when={stateHolder.isMounted()}>
      <div class={styles.HomeBox} style={styler2()}>
        {children}
      </div>
    </Show>
  );
}

function BgTextWrapper({ stateHolder, text }) {
  // const makeStyle = () =>
  //   StateStyle(
  //     stateHolder.isStyleMounted(),
  //     { opacity: 1 },
  //     { opacity: 0 },
  //     {}
  //   );

  // const [style, setStyle] = createSignal(makeStyle());

  // createEffect(() => {
  //   setStyle(makeStyle());
  // });

  const styler2 = StateStyler(stateHolder, {
    mounted: { opacity: 1 },
    unmounted: { opacity: 0 },
  });

  return (
    <Show when={stateHolder.isMounted()}>
      <BgText text={text} repeat={5000} style={styler2}></BgText>
    </Show>
  );
}

function HomeBtn({ stateHolder, onClick, hsl, children }) {
  const styler2 = StateStyler(stateHolder, {
    mounted: { opacity: 1 },
    unmounted: { opacity: 0 },
  });

  return (
    <Show when={stateHolder.isMounted()}>
      <Button
        onClick={onClick}
        hsl={hsl}
        style={styler2}
        duration={"5s"}
        delay={"3s"}
      >
        {children}
      </Button>
    </Show>
  );
}

function Boxes({ stateholder, hsl, children }) {
  const [overflow, setOverflow] = createSignal(undefined);

  const styler = StateStyler(stateholder, {
    unmounted: {
      opacity: 0,
      transform: "translateY(100vh)",
      "overflow-y": "hidden",
    },
    mounting: {
      opacity: 1,
      transform: "translateY(0vh)",
      "overflow-y": "hidden",
    },
    mounted: { opacity: 1, transform: "translateY(0vh)", "overflow-y": "auto" },
    constant: { color: fhsl(hsl) },
  });

  let element;

  const either = (x, a, b) => x == a || x == b;

  createEffect(() => {
    if (either(stateholder.state(), 1, 4)) {
      // console.log("boxes-overflow", element.scrollHeight, window.innerHeight);
      setOverflow(element.scrollHeight > window.innerHeight);
    }
  });

  return (
    <Show when={stateholder.isMounted()}>
      <div
        ref={element}
        class={styles.Boxes}
        style={{
          ...styler(),
          "padding-right":
            overflow() && either(stateholder.state(), 2, 4)
              ? "1rem"
              : undefined,
        }}
      >
        {children}
      </div>
    </Show>
  );
}

function useWindowSize() {
  const [height, setHeight] = createSignal(undefined);
  const [width, setWidth] = createSignal(undefined);

  onMount(() => {
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });
  return [width, height];
}

function HeightAuto({ children }) {
  let element;
  const [windowWidth] = useWindowSize();

  const [height, setHeight] = createSignal(0);

  const [style, setStyle] = createSignal({ "min-height": "0px" });

  createEffect(() => {
    if (windowWidth() > 0) {
      setHeight(element.scrollHeight);
      setStyle({ "min-height": `${height()}px` });
    }
  });

  return (
    <div ref={element} style={style()}>
      <p>{JSON.stringify(style())}</p>
      <div>{children}</div>
    </div>
  );
}

function Modules({ modules, hsl }) {
  const rands = modules.map((_, i) => {
    const rotation = Math.floor(-10 + 20 * Math.random());
    const invert = Math.random() > 0.6;
    return { rotation, invert };
  });

  const styleGen = () => {
    const rotation = Math.floor(-10 + 20 * Math.random());
    const invert = Math.random() > 0.6;

    const hsla = (a) => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${a})`;

    const transform = `rotate(${rotation}deg)`;
    if (invert) {
      return { transform, color: "white", "background-color": hsla(1.0) };
    } else {
      return { transform, color: hsla(1.0), "background-color": hsla(0.2) };
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

function MePage({ s }) {
  return (
    <Boxes stateholder={s.mePage} hsl={{ h: 200, s: 100, l: 30 }}>
      <div class={styles.Box}>
        <h1>About Me</h1>
        <div class={styles.Inner}>
          <p>
            Hi I'm Jack Kirby. I recently graduated with a Master's in
            Mechanical Engineering from the University of Warwick. Alongside my
            formal education, since 2013 I have been developing my programming
            skills. Beginning with a Caesar shift encoder and decoder in QB64, I
            have progressed to many other languages to achieve my personal
            projects including Python, Java, C++, Rust, HTML, CSS & JavaScript.
          </p>
          <br></br>
          <p>
            See the Mechanical Engineering page to explore the modules I covered
            at University along with the programs I used. Goto the Software
            Engineering page to view the projects I have worked on, for
            business, education and personal.
          </p>

          <div class={styles.Links}>
            <div class={styles.Link}>
              {/* <FontAwesomeIcon
          icon={faSquareEnvelope}
          className={"fa-2xl"}
        /> */}

              <IconEmail color={"hsl(200, 100%, 50%)"} size={"2xl"}></IconEmail>
              <a
                href="mailto:jackrekirby@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                jackrekirby@gmail.com
              </a>
            </div>
            <div class={styles.Link}>
              {/* <FontAwesomeIcon icon={faLinkedin} className={"fa-2xl"} /> */}
              <IconLinkedin
                color={"hsl(200, 100%, 50%)"}
                size={"2xl"}
              ></IconLinkedin>
              <a
                href="linkedin.com/in/jackrekirby/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/jackrekirby/
              </a>
            </div>
            <div class={styles.Link}>
              {/* <FontAwesomeIcon
          icon={faSquareGithub}
          className={"fa-2xl"}
        /> */}

              <IconGithub
                color={"hsl(200, 100%, 50%)"}
                size={"2xl"}
              ></IconGithub>
              <a
                href="github.com/Jackrekirby"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Jackrekirby
              </a>
            </div>
          </div>
        </div>
      </div>
    </Boxes>
  );
}

function MechanicalPage({ s, hsl }) {
  const style = {
    h1: { color: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    h2: { "background-color": `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  };

  return (
    <Boxes stateholder={s.mechPage} hsl={hsl}>
      <div class={styles.Box}>
        <h1 style={style.h1}>University Modules</h1>
        <div class={styles.Inner}>
          <h2 style={style.h2}>Year One</h2>
          <Modules
            modules={[
              "Introduction to Engineering: Professionalism and Practice",
              "Dynamics and Thermo-dynamics",
              "Electrical and Electronic Circuits",
              "Engineering Design",
              "Engineering Mathematics",
              "Introduction to Engineering Business Management",
              "Materials for Engineering",
              "Statics and Structures",
              "Systems Modelling, Simulation and Computation",
            ]}
            hsl={hsl}
          ></Modules>
          <h2 style={style.h2}>Year Two</h2>
          <Modules
            modules={[
              "Dynamics and Fluid Mechanics",
              "Electro-mechanical System Design",
              "Engineering Mathematics and Data Analytics",
              "Mechanical Engineering Design",
              "Motor Vehicle Technology",
              "Planar Structures and Mechanisms",
              "Systems and Software Engineering Principles",
              "Technical Operations Management",
            ]}
            hsl={hsl}
          ></Modules>
          <h2 style={style.h2}>Year Three</h2>
          <Modules
            modules={[
              "Individual Project (AcCoRD 2.0)",
              "Dynamics of Vibrating Systems",
              "Engines and Heat Pumps",
              "Advanced Mechanical Engineering Design",
              "Fluid Mechanics for Mechanical Engineers",
              "Finite Element Methods",
              "Precision, Measurement and Control",
            ]}
            hsl={hsl}
          ></Modules>
          <h2 style={style.h2}>Year Four</h2>
          <Modules
            modules={[
              "Group Project (HeatMyHome)",
              "Computational Fluid Dynamics",
              "Advanced Robotics",
              "Mathematical and Computer Modelling",
              "Renewable Energy",
              "Fuels and Combustion",
              "Biomechanics",
            ]}
            hsl={hsl}
          ></Modules>
        </div>
      </div>
      <div class={styles.Box}>
        <h1 style={style.h1}>Programs</h1>
        <div class={styles.Logos}>
          <img src="./src/assets/logos/fusion360.jpg" alt=""></img>
          <img src="./src/assets/logos/simulia_abaqus.png" alt=""></img>
          <img src="./src/assets/logos/arduino.png" alt=""></img>
          <img src="./src/assets/logos/masta.png" alt=""></img>
          <img src="./src/assets/logos/matlab_simulink.png" alt=""></img>
        </div>
      </div>
    </Boxes>
  );
}

function Box2({ title, hsl, children }) {
  return (
    <div class={styles.Box}>
      <h1 style={{ color: fhsl(hsl) }}>{title}</h1>
      <div class={styles.Inner}>{children}</div>
    </div>
  );
}

function Technologies({ techs, hsl }) {
  return (
    <div class={styles.Box}>
      <h1 style={{ color: fhsl(hsl) }}>Technologies</h1>
      <div class={styles.Logos}>
        <For each={techs}>
          {(tech) => {
            return <img src={`./src/assets/logos/${tech}.png`} alt=""></img>;
          }}
        </For>
      </div>
    </div>
  );
}

function HychainPage({ s, hsl }) {
  // const style = {
  //   h1: { color: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  //   h2: { "background-color": `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  // };

  return (
    <>
      <BackBtn
        stateholder={s.hychainPage}
        name={"Software"}
        order={1}
        color={fhsl(hsl)}
        onClick={() => {
          s.hychainPage.setMount(false);
          setTimeout(() => {
            s.softPage.setMount(true);
          }, 1100);
        }}
      ></BackBtn>
      <Boxes stateholder={s.hychainPage} hsl={hsl}>
        <Box2 title={"HyChain.co.uk"} hsl={hsl}>
          <SlideShow
            images={[
              {
                src: "./src/assets/projects/hychain/img1.png",
                alt: "hychain screenshot",
              },
              {
                src: "./src/assets/projects/hychain/img2.png",
                alt: "hychain screenshot 2",
              },
            ]}
          ></SlideShow>
          <p>
            Hychain is a collection of tools to model Hydrogen as an energy
            storage medium. Each tool consists of form(s) which when submitted
            run model(s) and display output in tabular and/or graphical format.
          </p>
        </Box2>

        <Technologies
          hsl={hsl}
          techs={[
            "aws_s3",
            "html",
            "js",
            "css",
            "heroku",
            "github",
            "mathjs",
            "netlify",
            "mathjax",
            "nodejs",
            "python",
            "matlab_simulink",
            "sheetjs",
            "chartjs",
            "openlayers",
            "expressjs",
          ]}
        ></Technologies>
      </Boxes>
    </>
  );
}

function HeatmyhomePage({ s, hsl }) {
  return (
    <>
      <BackBtn
        stateholder={s.heatmyhomePage}
        name={"Software"}
        order={1}
        color={fhsl(hsl)}
        onClick={() => {
          s.heatmyhomePage.setMount(false);
          setTimeout(() => {
            s.softPage.setMount(true);
          }, 1100);
        }}
      ></BackBtn>
      <Boxes stateholder={s.heatmyhomePage} hsl={hsl}>
        <Box2 title={"HeatMyHome.ninja"} hsl={hsl}>
          <SlideShow
            images={[
              {
                src: "./src/assets/projects/heatmyhome/home.png",
                alt: "home page",
              },
              {
                src: "./src/assets/projects/heatmyhome/results.png",
                alt: "results page",
              },
            ]}
          ></SlideShow>
          <p>
            HeatMyHome is a web tool to enable consumers to compare a range of
            heating technologies and solar ancillaries by simulating their
            home’s specific requirements.
          </p>
        </Box2>

        <Technologies
          hsl={hsl}
          techs={[
            "html",
            "js",
            "css",
            "github",
            "nodejs",
            "python",
            "rust",
            "wasm",
            "cpp",
            "chartjs",
            "expressjs",
            "cheeriojs",
          ]}
        ></Technologies>
      </Boxes>
    </>
  );
}

function AccordPage({ s, hsl }) {
  return (
    <>
      <BackBtn
        stateholder={s.accordPage}
        name={"Software"}
        order={1}
        color={fhsl(hsl)}
        onClick={() => {
          s.accordPage.setMount(false);
          setTimeout(() => {
            s.softPage.setMount(true);
          }, 1100);
        }}
      ></BackBtn>
      <Boxes stateholder={s.accordPage} hsl={hsl}>
        <Box2 title={"AcCoRD 2.0"} hsl={hsl}>
          <p>
            AcCoRD 2.0 (Actor-based Communication via Reaction-Diffusion) is a
            command-line program used to simulate molecular communication in
            virtual 3D environments. Molecules act as message carriers, with
            their concentration, for example, used to encode binary information.
          </p>

          <div class={styles.Links}>
            <div class={styles.Link}>
              <IconGithub color={fhsl(hsl)} size={"2xl"}></IconGithub>
              {/* <FontAwesomeIcon icon={faSquareGithub} className={"fa-2xl"} /> */}
              <a
                href="github.com/Jackrekirby/AcCoRD2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code and Docs
              </a>
            </div>
            <div class={styles.Link}>
              <IconYoutube color={fhsl(hsl)} size={"2xl"}></IconYoutube>
              {/* <FontAwesomeIcon icon={faSquareYoutube} className={"fa-2xl"} /> */}
              <a
                href="https://youtube.com/playlist?list=PL55Vx_QaVKZS6qdoi66Zng4fkF8YPCw3p"
                target="_blank"
                rel="noopener noreferrer"
              >
                Simulation Videos
              </a>
            </div>
            <div class={styles.Link}>
              <IconImage color={fhsl(hsl)} size={"2xl"}></IconImage>
              {/* <FontAwesomeIcon icon={faImage} className={"fa-2xl"} /> */}
              <a
                href="https://www.mediafire.com/folder/b9y9zb28rdtjq/AcCoRD_2.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"Environments & Plots"}
              </a>
            </div>
          </div>
        </Box2>

        <Box2 title={"Images"} hsl={hsl}>
          <SlideShow
            images={[
              {
                src: "./src/assets/projects/accord/env 1.png",
                alt: "environment 1",
                caption:
                  "This environment demonstrates spherical and cylindrical regions, and their ability to overlap each other. The user can define which region has priority in the area of overlap. A microscopic membrane shown in cyan only allows diffusion from the green to blue region through the cyan surface. A pseudo membrane is also defines between the red and green region so molecules can only diffuse from left to right.",
              },
              {
                src: "./src/assets/projects/accord/plot 1.png",
                alt: "plot 1",
                caption:
                  "A plot of the number of molecules in each region, as coloured in the spherical-cylinderical environment.",
              },
              {
                src: "./src/assets/projects/accord/env 2.png",
                alt: "environment 2",
                caption:
                  "This environment demonstrates the diffusion in mesoscopic regions. Region is divided into a 5x5x5 grid of subvolumes, were each subvolume is observed by a passive actor. As distance from the source increases passive actors are coloured red-green-blue-pink.",
              },
              {
                src: "./src/assets/projects/accord/plot 2.png",
                alt: "plot 2",
                caption:
                  "A plot of the number of molecules in each subvolume of the mesoscopic region. It can be observed molecules diffuse from the center of the region and distribute evenly amongst all subvolumes.",
              },
              {
                src: "./src/assets/projects/accord/env 3.png",
                alt: "environment 3",
                caption:
                  "This environment demonstrates the ability to place surfaces inside (over intersect) regions. Molecules diffuse from the bottom of the sphere to the top through a circular membrane.",
              },
              {
                src: "./src/assets/projects/accord/plot 3.png",
                alt: "plot 3",
                caption:
                  "A plot of the number of molecules in the top and bottom of the sphere. It can be observed molecules diffuse from the bottom of the sphere to the top through a circular membrane.",
              },
            ]}
          ></SlideShow>
        </Box2>

        <Box2 title={"Videos"} hsl={hsl}>
          <iframe
            style={{ width: "100%", "aspect-ratio": 16 / 9 }}
            src="https://www.youtube-nocookie.com/embed/videoseries?list=PL55Vx_QaVKZS6qdoi66Zng4fkF8YPCw3p"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box2>

        <Technologies
          hsl={hsl}
          techs={["github", "cpp", "matlab_simulink"]}
        ></Technologies>
      </Boxes>
    </>
  );
}

function PersonalPage({ s, hsl }) {
  const mounters = useMounter();

  return (
    <>
      <BackBtn
        stateholder={mounters.personalPage}
        name={"Software"}
        order={1}
        color={fhsl(hsl)}
        onClick={() => {
          mounters.personalPage.setMount(false);
          setTimeout(() => {
            s.softPage.setMount(true);
          }, 1100);
        }}
      ></BackBtn>
      <Boxes stateholder={mounters.personalPage} hsl={hsl}>
        <Box2 title={"Portfolio"} hsl={hsl}>
          <p>
            This website was build using react and sass, and is the second
            version of my Portfolio. The original version, the first website I
            ever created, was made using vanilla JavaScript and CSS. Visit my
            original portfolio to see some of the games I have recreated
            including Pacman in C++ and MATLAB, Minesweeper in C++ and Asteriods
            in Java.
          </p>

          <div class={styles.Links}>
            <div class={styles.Link}>
              <IconGithub color={fhsl(hsl)} size={"2xl"}></IconGithub>
              {/* <FontAwesomeIcon icon={faSquareGithub} className={"fa-2xl"} /> */}
              <a
                href="https://github.com/Jackrekirby/Portfolio_Original"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Jackrekirby/Portfolio_Old
              </a>
            </div>

            <div class={styles.Link}>
              <IconGithub color={fhsl(hsl)} size={"2xl"}></IconGithub>
              {/* <FontAwesomeIcon icon={faSquareGithub} className={"fa-2xl"} /> */}
              <a
                href="https://github.com/Jackrekirby/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Jackrekirby/Portfolio
              </a>
            </div>
          </div>

          <div class={styles.Logos}>
            <img src="./src/assets/logos/html.png" alt=""></img>
            <img src="./src/assets/logos/js.png" alt=""></img>
            <img src="./src/assets/logos/css.png" alt=""></img>
            <img src="./src/assets/logos/github.png" alt=""></img>
            <img src="./src/assets/logos/netlify.png" alt=""></img>
            <img src="./src/assets/logos/react.png" alt=""></img>
            <img src="./src/assets/logos/sass.png" alt=""></img>
          </div>
        </Box2>

        <Box2 title={"RayTracing"} hsl={hsl}>
          <SlideShow
            images={[
              {
                src: "./src/assets/projects/personal/raytracing/color_image_normal.png",
                alt: "environment 1",
                caption:
                  "An image generated using the raytracer. The Full HD resolution image, containing 30,000 sphere took 40 minutes to generate. Contains lambertian, metal and dielectric metals, of different colors, roughness and refractive indexes.",
              },
              {
                src: "./src/assets/projects/personal/raytracing/color_image_large.png",
                alt: "environment 1",
                caption:
                  "An zoomed out image of the same scene, showing all 30,000 spheres",
              },
              {
                src: "./src/assets/projects/personal/raytracing/samples_image_normal.png",
                alt: "environment 1",
                caption:
                  "An image showing an optimisation to reduce the number of samples per pixel. Darker pixels used fewer rays to generate before their color stabilised to below a threshold tolerance. The sky and lambertian surfaces contain the darkest pixels. The lightest pixels occur on the boundary of sphere, dielectric and metalic surfaces.",
              },
              {
                src: "./src/assets/projects/personal/raytracing/color_image_bvh.png",
                alt: "environment 1",
                caption:
                  "An image showing an optimisation to reduce the number of collision checks between a ray and all the spheres in the scene. This is done through dividing the spheres in the scene into a bounding volume hierachy. The spheres in each boundary volume are assigned a unique color.",
              },
              {
                src: "./src/assets/projects/personal/raytracing/web_ui.png",
                alt: "environment 1",
                caption:
                  "A web user interface to build spherical scenes and render them.",
              },
            ]}
          ></SlideShow>

          <p>
            An implementation of Ray Tracing in One Weekend using Rust, with a
            web user interface to build scenes using WASM, p5 and Tweakpane.
          </p>

          <div class={styles.Links}>
            <div class={styles.Link}>
              <IconGithub color={fhsl(hsl)} size={"2xl"}></IconGithub>
              {/* <FontAwesomeIcon icon={faSquareGithub} className={"fa-2xl"} /> */}
              <a
                href="https://github.com/Jackrekirby/Ray-Tracing"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Jackrekirby/Ray-Tracing
              </a>
            </div>
          </div>

          <div class={styles.Logos}>
            <img src="./src/assets/logos/html.png" alt=""></img>
            <img src="./src/assets/logos/js.png" alt=""></img>
            <img src="./src/assets/logos/css.png" alt=""></img>
            <img src="./src/assets/logos/github.png" alt=""></img>
            <img src="./src/assets/logos/rust.png" alt=""></img>
            <img src="./src/assets/logos/wasm.png" alt=""></img>
          </div>
        </Box2>

        <Box2 title={"Watch History"} hsl={hsl}>
          <SlideShow
            images={[
              {
                src: "./src/assets/projects/personal/whe/v1.png",
                alt: "environment 1",
                caption:
                  "A screenshot of the original version, listing series by A-Z.",
              },
              {
                src: "./src/assets/projects/personal/whe/v2.png",
                alt: "environment 2",
                caption:
                  "A screenshot of the new version, listing series by popularity.",
              },
            ]}
          ></SlideShow>

          <p>
            An website to enable Netflix users to view everything they have
            watched. The original version was build with vanilla JavaScript and
            did not use any program databases. It only utilised the data inside
            the Netflix export file which provides the time a program was
            watched and its name. The website therefore has to estimate if a
            program was a movie of tv series, and group tv episodes to compute
            statistics including number of episodes and seasons watched along
            with the duration taken to watch a series.
          </p>
          <br></br>
          <p>
            The new version, build with React and Sass, uses a program database,
            TMDB (The Movie Data Base), to lookup programs to gather images,
            additional statistics and help determine if a program is a series or
            movie. The filtering of program names to estimate program type and
            help find the correct program on TMDB created significant
            complexity.
          </p>

          <div class={styles.Links}>
            <div class={styles.Link}>
              <IconGithub color={fhsl(hsl)} size={"2xl"}></IconGithub>
              <a
                href="https://github.com/Jackrekirby/Netflix-Watch-History"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub - Version 1
              </a>
            </div>
            <div class={styles.Link}>
              <IconGithub color={fhsl(hsl)} size={"2xl"}></IconGithub>
              <a
                href="https://github.com/Jackrekirby/Netflix-Watch-History-V2"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub - Version 2
              </a>
            </div>

            <div class={styles.Link}>
              <IconWebsite color={fhsl(hsl)} size={"2xl"}></IconWebsite>
              {/* <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className={"fa-2xl"}
              /> */}
              <a
                href="https://github.com/Jackrekirby/Netflix-Watch-History"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website - Version 1
              </a>
            </div>
            <div class={styles.Link}>
              {/* <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className={"fa-2xl"}
              /> */}
              <IconWebsite color={fhsl(hsl)} size={"2xl"}></IconWebsite>
              <a
                href="https://https://watch-history-explorer.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website - Version 2
              </a>
            </div>
          </div>

          <div class={styles.Logos}>
            <img src="./src/assets/logos/html.png" alt=""></img>
            <img src="./src/assets/logos/js.png" alt=""></img>
            <img src="./src/assets/logos/css.png" alt=""></img>
            <img src="./src/assets/logos/github.png" alt=""></img>
            <img src="./src/assets/logos/netlify.png" alt=""></img>
            <img src="./src/assets/logos/react.png" alt=""></img>
            <img src="./src/assets/logos/sass.png" alt=""></img>
          </div>
        </Box2>
      </Boxes>
    </>
  );
}

function fhsl({ h, s, l }) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function fhsla({ h, s, l }, a) {
  return `hsl(${h}, ${s}%, ${l}%, ${a})`;
}

function SoftwarePage({ s, hsl }) {
  return (
    <Boxes stateholder={s.softPage} hsl={hsl}>
      <SoftwareProjects s={s} hsl={hsl}></SoftwareProjects>
    </Boxes>
  );
}

function SoftwareProjects({ s, hsl }) {
  function PillList({ items }) {
    return (
      <div class={styles.List}>
        <For each={items}>
          {(item) => (
            <p style={{ "background-color": fhsla(hsl, 0.8) }}>{item}</p>
          )}
        </For>
      </div>
    );
  }

  function PillLink({ href, name }) {
    return (
      <div class={styles.List}>
        <a
          style={{ "background-color": fhsla(hsl, 0.8) }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </div>
    );
  }

  const mounters = useMounter();

  return (
    <div class={styles.SoftwareProjects}>
      <h1>Projects</h1>
      <div class={styles.Grid}>
        <div class={styles.Cell}>
          <div class={styles.Pills}>
            <div class={styles.Pill}>
              <IconTechStack color={fhsl(hsl)} size={"xl"}></IconTechStack>
              <PillList items={["Node", "AWS S3", "MATLAB", "+"]}></PillList>
            </div>
            <div class={styles.Pill}>
              <IconWebsite color={fhsl(hsl)} size={"xl"}></IconWebsite>
              <PillLink
                href={"hychain.co.uk"}
                name={"hychain.co.uk"}
              ></PillLink>
            </div>
          </div>
          <h2
            onClick={() => {
              s.softPage.setMount(false);
              setTimeout(() => {
                s.hychainPage.setMount(true);
              }, 1100);
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
              <IconTechStack color={fhsl(hsl)} size={"xl"}></IconTechStack>
              <PillList items={["Express.js", "Rust", "WASM", "+"]}></PillList>
            </div>
            <div class={styles.Pill}>
              <IconWebsite color={fhsl(hsl)} size={"xl"}></IconWebsite>
              <PillLink
                href={"heatmyhome.ninja"}
                name={"heatmyhome.ninja"}
              ></PillLink>
            </div>
            <div class={styles.Pill}>
              <IconGithub color={fhsl(hsl)} size={"xl"}></IconGithub>
              <PillLink
                href={"github.com/Jackrekirby/HeatMyHome-Simulator-Dev"}
                name={"GitHub Repository"}
              ></PillLink>
            </div>
          </div>
          <h2
            onClick={() => {
              s.softPage.setMount(false);
              setTimeout(() => {
                s.heatmyhomePage.setMount(true);
              }, 1100);
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
              <IconTechStack color={fhsl(hsl)} size={"xl"}></IconTechStack>
              <PillList items={["C++", "MATLAB", "JSON"]}></PillList>
            </div>
            <div class={styles.Pill}>
              <IconGithub color={fhsl(hsl)} size={"xl"}></IconGithub>
              <PillLink
                href={"github.com/Jackrekirby/AcCoRD2"}
                name={"GitHub Repository"}
              ></PillLink>
            </div>
          </div>
          <h2
            onClick={() => {
              s.softPage.setMount(false);
              setTimeout(() => {
                s.accordPage.setMount(true);
              }, 1100);
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
              <IconTechStack color={fhsl(hsl)} size={"xl"}></IconTechStack>
              <PillList
                items={["Java", "C++", "React", "Rust", "+"]}
              ></PillList>
            </div>
          </div>
          <h2
            onClick={() => {
              s.softPage.setMount(false);
              setTimeout(() => {
                mounters.personalPage.setMount(true);
              }, 1100);
            }}
          >
            Personal
          </h2>
          <p class={styles.Description}>A range of small personal projects.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const initMountStates = {
    me: true,
    eng: false,
    mech: true,
    soft: false,
    meBgtext: false,
    mechBgtext: false,
    softBgtext: false,

    meBtn: false,
    mechBtn: false,
    softBtn: false,

    backHomeBtn: false,

    mePage: false,
    mechPage: false,
    softPage: false,

    hychainPage: false,
    heatmyhomePage: false,
    accordPage: false,
    personalPage: false,
  };

  return (
    <div class={styles.App}>
      <MounterProvider mounters={initMountStates}>
        <MounterApp></MounterApp>
      </MounterProvider>
    </div>
  );
}

function MounterApp() {
  const mounters = useMounter();

  const { mount, dismount } = mounterFncs(mounters);

  mount(["meBtn", "meBgtext"], 1);
  mount(["eng", "mechBgtext", "mechBtn"], 2);
  mount(["soft", "softBgtext", "softBtn"], 3);

  return (
    <>
      <Box
        stateHolder={mounters.me}
        isVertical={false}
        color="hsl(200, 100%, 50%)"
      >
        <BgTextWrapper
          stateHolder={mounters.meBgtext}
          text={BgTextList.me}
        ></BgTextWrapper>

        <div class={styles.HomeBoxInner}>
          <BackBtn
            stateholder={mounters.backHomeBtn}
            name={"Home"}
            color={"hsl(200, 100%, 30%)"}
            onClick={() => {
              dismount(["backHomeBtn", "mePage"], 0);
              mount(["eng", "meBtn"], 1);
            }}
          ></BackBtn>

          <MePage s={mounters}></MePage>

          <HomeBtn
            stateHolder={mounters.meBtn}
            onClick={() => {
              dismount(["eng", "meBtn"], 0);
              mount(["backHomeBtn", "mePage"], 1);
            }}
            hsl={{ h: 200, s: 100, l: 50 }}
          >
            <p>Jack Kirby</p>
          </HomeBtn>
        </div>
      </Box>

      <Box
        stateHolder={mounters.eng}
        isVertical={false}
        color="hsl(250, 100%, 77%)"
      >
        <Box
          stateHolder={mounters.mech}
          isVertical={true}
          color="hsl(250, 100%, 77%)"
        >
          <BgTextWrapper
            stateHolder={mounters.mechBgtext}
            text={BgTextList.mech}
          ></BgTextWrapper>

          <BackBtn
            stateholder={mounters.backHomeBtn}
            name={"Home"}
            color={"hsl(250, 60%, 77%)"}
            onClick={() => {
              dismount(["backHomeBtn", "mechPage"], 0);
              mount(["me", "mechBtn"], 1);
              mount(["soft"], 2);
            }}
          ></BackBtn>

          <HomeBtn
            stateHolder={mounters.mechBtn}
            onClick={() => {
              dismount(["soft"], 0);
              dismount(["me", "mechBtn"], 1);
              mount(["mechPage", "backHomeBtn"], 2);
            }}
            hsl={{ h: 250, s: 100, l: 77 }}
          >
            <p>Mechanical Engineer</p>
          </HomeBtn>

          <MechanicalPage
            hsl={{ h: 250, s: 100, l: 77 }}
            s={mounters}
          ></MechanicalPage>
        </Box>

        <Box
          stateHolder={mounters.soft}
          isVertical={true}
          color="hsl(12, 82%, 50%)"
        >
          <BgTextWrapper
            stateHolder={mounters.softBgtext}
            text={BgTextList.soft}
          ></BgTextWrapper>

          <BackBtn
            stateholder={mounters.backHomeBtn}
            name={"Home"}
            color={"hsl(12, 82%, 50%)"}
            onClick={() => {
              dismount(["backHomeBtn", "softPage"], 0);
              mount(["me", "softBtn"], 1);
              mount(["mech"], 2);
            }}
          ></BackBtn>

          <HomeBtn
            stateHolder={mounters.softBtn}
            onClick={() => {
              dismount(["mech"], 0);
              dismount(["me", "softBtn"], 1);
              mount(["backHomeBtn", "softPage"], 2);
            }}
            hsl={{ h: 12, s: 82, l: 50 }}
          >
            <p>Software Engineer</p>
          </HomeBtn>

          <SoftwarePage
            hsl={{ h: 12, s: 82, l: 50 }}
            s={mounters}
          ></SoftwarePage>

          <HychainPage hsl={{ h: 12, s: 82, l: 50 }} s={mounters}></HychainPage>

          <HeatmyhomePage
            hsl={{ h: 12, s: 82, l: 50 }}
            s={mounters}
          ></HeatmyhomePage>

          <AccordPage hsl={{ h: 12, s: 82, l: 50 }} s={mounters}></AccordPage>

          <PersonalPage
            hsl={{ h: 12, s: 82, l: 50 }}
            s={mounters}
          ></PersonalPage>
        </Box>
      </Box>
    </>
  );
}

export default App;
