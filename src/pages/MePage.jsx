import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import Links from "../components/Links";
import { useMounter } from "../components/MounterProvider";

function MePage() {
  const mounters = useMounter();

  return (
    <Boxes stateholder={mounters.mePage}>
      <Box2 title={"About Me"}>
        <p>
          Hi I'm Jack Kirby. I recently graduated with a Master's in Mechanical
          Engineering from the University of Warwick. Alongside my formal
          education, since 2013 I have been developing my programming skills.
          Beginning with a Caesar shift encoder and decoder in QB64, I have
          progressed to many other languages to achieve my personal projects
          including Python, Java, C++, Rust, HTML, CSS & JavaScript.
        </p>
        <br></br>
        <p>
          See the Mechanical Engineering page to explore the modules I covered
          at University along with the programs I used. Goto the Software
          Engineering page to view the projects I have worked on, for business,
          education and personal.
        </p>

        <Links
          links={[
            {
              href: "mailto:jackrekirby@gmail.com",
              name: "jackrekirby@gmail.com",
              icon: "Email",
            },
            {
              href: "linkedin.com/in/jackrekirby/",
              name: "linkedin.com/in/jackrekirby/",
              icon: "Linkedin",
            },
            {
              href: "github.com/Jackrekirby",
              name: "github.com/Jackrekirby",
              icon: "Github",
            },
          ]}
        ></Links>
      </Box2>
    </Boxes>
  );
}

export default MePage;
