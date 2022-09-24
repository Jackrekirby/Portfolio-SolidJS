import styles from "./Logos.module.css";

import img_arduino from "../assets/logos/arduino.png";
import img_aws_s3 from "../assets/logos/aws_s3.png";
import img_chartjs from "../assets/logos/chartjs.png";
import img_cheeriojs from "../assets/logos/cheeriojs.png";
import img_cpp from "../assets/logos/cpp.png";
import img_css from "../assets/logos/css.png";
import img_expressjs from "../assets/logos/expressjs.png";
import img_fusion360 from "../assets/logos/fusion360.png";
import img_github from "../assets/logos/github.png";
import img_heroku from "../assets/logos/heroku.png";
import img_html from "../assets/logos/html.png";
import img_js from "../assets/logos/js.png";
import img_masta from "../assets/logos/masta.png";
import img_mathjax from "../assets/logos/mathjax.png";
import img_mathjs from "../assets/logos/mathjs.png";
import img_matlab_simulink from "../assets/logos/matlab_simulink.png";
import img_matlab from "../assets/logos/matlab.png";
import img_netlify from "../assets/logos/netlify.png";
import img_nodejs from "../assets/logos/nodejs.png";
import img_openlayers from "../assets/logos/openlayers.png";
import img_python from "../assets/logos/python.png";
import img_react from "../assets/logos/react.png";
import img_rust from "../assets/logos/rust.png";
import img_sass from "../assets/logos/sass.png";
import img_sheetjs from "../assets/logos/sheetjs.png";
import img_simulia_abaqus from "../assets/logos/simulia_abaqus.png";
import img_wasm from "../assets/logos/wasm.png";

const links = {
  arduino: img_arduino,
  aws_s3: img_aws_s3,
  chartjs: img_chartjs,
  cheeriojs: img_cheeriojs,
  cpp: img_cpp,
  css: img_css,
  expressjs: img_expressjs,
  fusion360: img_fusion360,
  github: img_github,
  heroku: img_heroku,
  html: img_html,
  js: img_js,
  masta: img_masta,
  mathjax: img_mathjax,
  mathjs: img_mathjs,
  matlab_simulink: img_matlab_simulink,
  matlab: img_matlab,
  netlify: img_netlify,
  nodejs: img_nodejs,
  openlayers: img_openlayers,
  python: img_python,
  react: img_react,
  rust: img_rust,
  sass: img_sass,
  sheetjs: img_sheetjs,
  simulia_abaqus: img_simulia_abaqus,
  wasm: img_wasm,
};

function Logos({ logos }) {
  return (
    <div class={styles.Logos}>
      <For each={logos}>
        {(logo) => {
          return <img src={links[logo]} alt=""></img>;
        }}
      </For>
    </div>
  );
}

export default Logos;
