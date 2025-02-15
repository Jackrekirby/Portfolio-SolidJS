import BackBtn from "../components/BackBtn";
import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import { mounterFncs, useMounter } from "../components/MounterProvider";
import Technologies from "../components/Technologies";

function AuroraPage() {
  const mounters = useMounter();

  const { mount, dismount } = mounterFncs(mounters);

  return (
    <>
      <BackBtn
        stateholder={mounters.auroraPage}
        name={"Software"}
        order={1}
        onClick={() => {
          dismount(["auroraPage"], 0);
          mount(["softPage"], 1);
        }}
        width={"5.5rem"}
      ></BackBtn>
      <Boxes stateholder={mounters.auroraPage}>
        <Box2 title={"Aurora"}>
          <p>
          Aurora Energy Research is an energy market analytics company that provides intelligence for strategy, portfolio management and investment decisions on the global energy transformation.
          </p>
          <br></br>
          <p>
          Aurora offers a range of software solutions through its web platform. This allows clients to view reports, historical data and simulate market scenarios, wind turbines and batteries.
          </p>
          <br></br>
          <p>
          At my time in Aurora, I have worked in the software development team, producing and automating the generation of historical dashboards, along with working on the front and backend systems that manage the market scenario simulation model. I currently work closely with the modelling team to ensure the market model scales in a maintainable fashion to enable Aurora to expand into new markets and increase functionality for existing markets. 
          </p>
        </Box2>

        <Technologies
          techs={[
            "aws",
            "ts",
            'react',
            "python",
            'redshift',
            'mysql',
            "duckdb",
          ]}
        ></Technologies>
      </Boxes>
    </>
  );
}

export default AuroraPage;
