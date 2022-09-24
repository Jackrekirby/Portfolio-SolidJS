import BackBtn from "../components/BackBtn";
import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import { mounterFncs, useMounter } from "../components/MounterProvider";
import SlideShow from "../components/SlideShow";
import Technologies from "../components/Technologies";

import img_1 from "../assets/projects/hychain/img1.png";
import img_2 from "../assets/projects/hychain/img2.png";

function HychainPage() {
  const mounters = useMounter();

  const { mount, dismount } = mounterFncs(mounters);

  return (
    <>
      <BackBtn
        stateholder={mounters.hychainPage}
        name={"Software"}
        order={1}
        onClick={() => {
          dismount(["hychainPage"], 0);
          mount(["softPage"], 1);
        }}
        width={"5.5rem"}
      ></BackBtn>
      <Boxes stateholder={mounters.hychainPage}>
        <Box2 title={"HyChain.co.uk"}>
          <SlideShow
            images={[
              {
                src: img_1,
                alt: "hychain screenshot",
              },
              {
                src: img_2,
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

export default HychainPage;
