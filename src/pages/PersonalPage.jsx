import BackBtn from "../components/BackBtn";
import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import Links from "../components/Links";
import Logos from "../components/Logos";
import { mounterFncs, useMounter } from "../components/MounterProvider";
import SlideShow from "../components/SlideShow";

import img_color_normal from "../assets/projects/personal/raytracing/color_image_normal.png";
import img_color_large from "../assets/projects/personal/raytracing/color_image_large.png";
import img_samples_normal from "../assets/projects/personal/raytracing/samples_image_normal.png";
import img_color_bvh from "../assets/projects/personal/raytracing/color_image_bvh.png";
import img_web_ui from "../assets/projects/personal/raytracing/web_ui.png";

import img_whe_v1 from "../assets/projects/personal/whe/v1.png";
import img_whe_v2 from "../assets/projects/personal/whe/v2.png";

import img_mca_demo_world from "../assets/projects/personal/minecraft_automata/demo_world.png";
import img_mca_piston_door from "../assets/projects/personal/minecraft_automata/piston_door.png";
import img_mca_3d_demo from "../assets/projects/personal/minecraft_automata/3d_demo.png";

import img_cuda_main from "../assets/projects/personal/raytracing/cuda_main.png";
import img_cuda_lights from "../assets/projects/personal/raytracing/cuda_lights.png";

function HeaderSpacer({}) {
  return (
    <div style={{ 'min-height': '64px' }}></div>
  );
}


function PersonalPage() {
  const mounters = useMounter();
  const { mount, dismount } = mounterFncs(mounters);

  return (
    <>
      <BackBtn
        stateholder={mounters.personalPage}
        name={"Software"}
        order={0}
        onClick={() => {
          dismount(["personalPage"], 0);
          mount(["backHomeBtn", "softPage"], 1);
        }}
        width={"5.5rem"}
      ></BackBtn>
      <Boxes stateholder={mounters.personalPage}>
        <HeaderSpacer></HeaderSpacer>
        <Box2 title={"Portfolio"}>
          <p>
            This website was build using react and sass, and is the second
            version of my Portfolio. The original version, the first website I
            ever created, was made using vanilla JavaScript and CSS. Visit my
            original portfolio to see some of the games I have recreated
            including Pacman in C++ and MATLAB, Minesweeper in C++ and Asteriods
            in Java.
          </p>

          <Links
            links={[
              {
                name: "github.com/Jackrekirby/Portfolio",
                href: "https://github.com/Jackrekirby/Portfolio",
                icon: "Github",
              },
              {
                name: "github.com/Jackrekirby/Portfolio-SolidJS",
                href: "https://github.com/Jackrekirby/Portfolio-SolidJS",
                icon: "Github",
              },
            ]}
          ></Links>

          <Logos
            logos={["html", "js", "css", "github", "netlify", "react", "sass"]}
          ></Logos>
        </Box2>

        <Box2 title={"Ray Tracing"}>
          <SlideShow
            images={[
              {
                src: img_color_normal,
                alt: "rust version",
                caption:
                  "An image generated using the raytracer. The Full HD resolution image, containing 30,000 sphere took 40 minutes to generate. Contains lambertian, metal and dielectric metals, of different colors, roughness and refractive indexes.",
              },
              {
                src: img_color_large,
                alt: "rust version zoomed out",
                caption:
                  "An zoomed out image of the same scene, showing all 30,000 spheres",
              },
              {
                src: img_samples_normal,
                alt: "rust version samples per pixel",
                caption:
                  "An image showing an optimisation to reduce the number of samples per pixel. Darker pixels used fewer rays to generate before their color stabilised to below a threshold tolerance. The sky and lambertian surfaces contain the darkest pixels. The lightest pixels occur on the boundary of sphere, dielectric and metalic surfaces.",
              },
              {
                src: img_color_bvh,
                alt: "rust version bounding volume hierachy",
                caption:
                  "An image showing an optimisation to reduce the number of collision checks between a ray and all the spheres in the scene. This is done through dividing the spheres in the scene into a bounding volume hierachy. The spheres in each boundary volume are assigned a unique color.",
              },
              {
                src: img_web_ui,
                alt: "web interface",
                caption:
                  "A web user interface to build spherical scenes and render them.",
              },
              {
                src: img_cuda_main,
                alt: "cuda version",
                caption:
                  "A re-implementation of the raytracing in C++ with Cuda. Includes skybox.",
              },
              {
                src: img_cuda_lights,
                alt: "cuda version lightning",
                caption:
                  "A re-implementation of the raytracing in C++ with Cuda. Includes lighting.",
              },
            ]}
          ></SlideShow>

          <p>
            An implementation of Ray Tracing in One Weekend using Rust, with a
            web user interface to build scenes using WASM, p5 and Tweakpane.

            I also repeated the project with Cuda in C++. This version added a skybox and basic lighting.
          </p>

          <Links
            links={[
              {
                name: "github.com/Jackrekirby/Ray-Tracing",
                href: "https://github.com/Jackrekirby/Ray-Tracing",
                icon: "Github",
              },
              {
                name: "github.com/Jackrekirby/Raytracing-Cuda",
                href: "https://github.com/Jackrekirby/Raytracing-Cuda",
                icon: "Github",
              },
            ]}
          ></Links>

          <Logos
            logos={["html", "js", "css", "github", "rust", "wasm", 'cpp', 'cuda']}
          ></Logos>
        </Box2>

        <Box2 title={"Minecraft Automata"}>
        <SlideShow
            images={[
              {
                src: img_mca_demo_world,
                alt: "demo world",
                caption:
                  "A screenshot of the demo world, containing a variety of comptraptions to demonstrate all block types",
              },
              {
                src: img_mca_piston_door,
                alt: "3 x 3 piston door",
                caption:
                  "A screenshot of a 3x3 piston door along with the command system",
              },
              {
                src: img_mca_3d_demo,
                alt: "3D demo world",
                caption:
                  "A screenshot of the demo world in the Go-based version",
              },
            ]}
          ></SlideShow>
          <p>
            I wanted to build a minecraft redstone simulation tool for the web. I set myself the challenge of doing this as a cellular automata, where all blocks can be updated in parallel, rather than via a queue based system. This project was build from scratch in typescript, using the 2D canvas.

            I also repeated the project with a 3D world, written in Go and compiled to Web Assembly. This version was short lived, with only a few block types. The project was discontinued due to performance issues related to building a single-threaded CPU-based 3D renderer.
          </p>

          <Links
            links={[
              {
                name: "github.com/jackrekirby/minecraft-ca-ts",
                href: "https://github.com/jackrekirby/minecraft-ca-ts",
                icon: "Github",
              },
              {
                name: "github.com/jackrekirby/minecraft-ca-go",
                href: "https://github.com/jackrekirby/minecraft-ca-go",
                icon: "Github",
              },
            ]}
          ></Links>

          <Logos
            logos={["html", "ts", "css", "github", 'go', 'wasm']}
          ></Logos>
        </Box2>

        <Box2 title={"Watch History"}>
          <SlideShow
            images={[
              {
                src: img_whe_v1,
                alt: "environment 1",
                caption:
                  "A screenshot of the original version, listing series by A-Z.",
              },
              {
                src: img_whe_v2,
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

          <Links
            links={[
              {
                name: "github.com/Jackrekirby/Netflix-Watch-History",
                href: "https://github.com/Jackrekirby/Netflix-Watch-History",
                icon: "Github",
              },
              {
                name: "github.com/Jackrekirby/Netflix-Watch-History-V2",
                href: "https://github.com/Jackrekirby/Netflix-Watch-History-V2",
                icon: "Github",
              },
            ]}
          ></Links>

          <Logos
            logos={["html", "js", "css", "github", "netlify", "react", "sass"]}
          ></Logos>
        </Box2>
      </Boxes>
    </>
  );
}

export default PersonalPage;
