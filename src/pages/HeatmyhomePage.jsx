import BackBtn from "../components/BackBtn";
import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import { mounterFncs, useMounter } from "../components/MounterProvider";
import SlideShow from "../components/SlideShow";
import Technologies from "../components/Technologies";

import img_home from "../assets/projects/heatmyhome/home.png";
import img_results from "../assets/projects/heatmyhome/results.png";

function HeatmyhomePage() {
  const mounters = useMounter();
  const { mount, dismount } = mounterFncs(mounters);

  return (
    <>
      <BackBtn
        stateholder={mounters.heatmyhomePage}
        name={"Software"}
        order={1}
        onClick={() => {
          dismount(["heatmyhomePage"], 0);
          mount(["softPage"], 1);
        }}
      ></BackBtn>
      <Boxes stateholder={mounters.heatmyhomePage}>
        <Box2 title={"HeatMyHome.ninja"}>
          <SlideShow
            images={[
              {
                src: img_home,
                alt: "home page",
              },
              {
                src: img_results,
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

export default HeatmyhomePage;
