import BackBtn from "../components/BackBtn";
import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import { mounterFncs, useMounter } from "../components/MounterProvider";
import SlideShow from "../components/SlideShow";
import Technologies from "../components/Technologies";

import img_home from "../assets/projects/heatmyhome/home.png";
import img_results from "../assets/projects/heatmyhome/results.png";

function HeaderSpacer({}) {
  return (
    <div style={{ 'min-height': '64px' }}></div>
  );
}

function HeatmyhomePage() {
  const mounters = useMounter();
  const { mount, dismount } = mounterFncs(mounters);

  return (
    <>
      <BackBtn
        stateholder={mounters.heatmyhomePage}
        name={"Software"}
        order={0}
        onClick={() => {
          dismount(["heatmyhomePage"], 0);
          mount(["backHomeBtn", "softPage"], 1);
        }}
        width={"5.5rem"}
      ></BackBtn>
      <Boxes stateholder={mounters.heatmyhomePage}>
        <HeaderSpacer></HeaderSpacer>
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
