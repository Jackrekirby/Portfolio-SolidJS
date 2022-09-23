import Box2 from "../components/Box2";
import Boxes from "../components/Boxes";
import { useColor } from "../components/ColorProvider";
import Logos from "../components/Logos";
import Modules from "../components/Modules";
import { useMounter } from "../components/MounterProvider";

function MechanicalPage() {
  const colorer = useColor();
  const mounters = useMounter();

  const style = {
    h1: { color: colorer.fhsl },
    h2: { "background-color": colorer.fhsl },
  };

  return (
    <Boxes stateholder={mounters.mechPage}>
      <Box2 title={"University Modules"}>
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
        ></Modules>
      </Box2>

      <Box2 title={"Programs"}>
        <Logos
          logos={[
            "fusion360",
            "simulia_abaqus",
            "arduino",
            "masta",
            "matlab_simulink",
          ]}
        ></Logos>
      </Box2>
    </Boxes>
  );
}

export default MechanicalPage;
