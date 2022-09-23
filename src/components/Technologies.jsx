import Box2 from "./Box2";
import Logos from "./Logos";

function Technologies({ techs }) {
  return (
    <Box2 title={"Technologies"}>
      <Logos logos={techs}></Logos>
    </Box2>
  );
}

export default Technologies;
