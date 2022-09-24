import BackBtn from "../components/BackBtn";
import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import Links from "../components/Links";
import { mounterFncs, useMounter } from "../components/MounterProvider";
import SlideShow from "../components/SlideShow";
import Technologies from "../components/Technologies";

import img_env_1 from "../assets/projects/accord/env 1.png";
import img_plot_1 from "../assets/projects/accord/plot 1.png";
import img_env_2 from "../assets/projects/accord/env 2.png";
import img_plot_2 from "../assets/projects/accord/plot 2.png";
import img_env_3 from "../assets/projects/accord/env 3.png";
import img_plot_3 from "../assets/projects/accord/plot 3.png";

function AccordPage() {
  const mounters = useMounter();
  const { mount, dismount } = mounterFncs(mounters);

  return (
    <>
      <BackBtn
        stateholder={mounters.accordPage}
        name={"Software"}
        order={1}
        onClick={() => {
          dismount(["accordPage"], 0);
          mount(["softPage"], 1);
        }}
        width={"5.5rem"}
      ></BackBtn>
      <Boxes stateholder={mounters.accordPage}>
        <Box2 title={"AcCoRD 2.0"}>
          <p>
            AcCoRD 2.0 (Actor-based Communication via Reaction-Diffusion) is a
            command-line program used to simulate molecular communication in
            virtual 3D environments. Molecules act as message carriers, with
            their concentration, for example, used to encode binary information.
          </p>

          <Links
            links={[
              {
                href: "github.com/Jackrekirby/AcCoRD2",
                name: "Code and Docs",
                icon: "Github",
              },
              {
                href: "https://youtube.com/playlist?list=PL55Vx_QaVKZS6qdoi66Zng4fkF8YPCw3p",
                name: "Simulation Videos",
                icon: "Youtube",
              },
              {
                href: "https://www.mediafire.com/folder/b9y9zb28rdtjq/AcCoRD_2.0",
                name: "Environments & Plots",
                icon: "Image",
              },
            ]}
          ></Links>
        </Box2>

        <Box2 title={"Images"}>
          <SlideShow
            images={[
              {
                src: img_env_1,
                alt: "environment 1",
                caption:
                  "This environment demonstrates spherical and cylindrical regions, and their ability to overlap each other. The user can define which region has priority in the area of overlap. A microscopic membrane shown in cyan only allows diffusion from the green to blue region through the cyan surface. A pseudo membrane is also defines between the red and green region so molecules can only diffuse from left to right.",
              },
              {
                src: img_plot_1,
                alt: "plot 1",
                caption:
                  "A plot of the number of molecules in each region, as coloured in the spherical-cylinderical environment.",
              },
              {
                src: img_env_2,
                alt: "environment 2",
                caption:
                  "This environment demonstrates the diffusion in mesoscopic regions. Region is divided into a 5x5x5 grid of subvolumes, were each subvolume is observed by a passive actor. As distance from the source increases passive actors are coloured red-green-blue-pink.",
              },
              {
                src: img_plot_2,
                alt: "plot 2",
                caption:
                  "A plot of the number of molecules in each subvolume of the mesoscopic region. It can be observed molecules diffuse from the center of the region and distribute evenly amongst all subvolumes.",
              },
              {
                src: img_env_3,
                alt: "environment 3",
                caption:
                  "This environment demonstrates the ability to place surfaces inside (over intersect) regions. Molecules diffuse from the bottom of the sphere to the top through a circular membrane.",
              },
              {
                src: img_plot_3,
                alt: "plot 3",
                caption:
                  "A plot of the number of molecules in the top and bottom of the sphere. It can be observed molecules diffuse from the bottom of the sphere to the top through a circular membrane.",
              },
            ]}
          ></SlideShow>
        </Box2>

        <Box2 title={"Videos"}>
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
          techs={["github", "cpp", "matlab_simulink"]}
        ></Technologies>
      </Boxes>
    </>
  );
}

export default AccordPage;
