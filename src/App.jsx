import styles from "./App.module.css";
import Button from "./components/Button";
import BgText from "./components/BgText";
import BackBtn from "./components/BackBtn";

import {
  mounterFncs,
  MounterProvider,
  useMounter,
} from "./components/MounterProvider";

import * as BgTextList from "./data/BgTextLists";
import { ColorProvider } from "./components/ColorProvider";
import Box from "./components/Box";
import MePage from "./pages/MePage";
import MechanicalPage from "./pages/MechanicalPage";
import HeatmyhomePage from "./pages/HeatmyhomePage";
import AccordPage from "./pages/AccordPage";
import PersonalPage from "./pages/PersonalPage";
import HychainPage from "./pages/HychainPage";
import SoftwarePage from "./pages/SoftwarePage";

const initMountStates = {
  me: true,
  eng: false,
  mech: true,
  soft: false,
  meBgtext: false,
  mechBgtext: false,
  softBgtext: false,

  meBtn: false,
  mechBtn: false,
  softBtn: false,

  backHomeBtn: false,

  mePage: false,
  mechPage: false,
  softPage: false,

  hychainPage: false,
  heatmyhomePage: false,
  accordPage: false,
  personalPage: false,
};

function App() {
  return (
    <div class={styles.App}>
      <MounterProvider mounters={initMountStates}>
        <MounterApp></MounterApp>
      </MounterProvider>
    </div>
  );
}

function MounterApp() {
  const mounters = useMounter();

  const { mount, dismount } = mounterFncs(mounters);

  mount(["meBtn", "meBgtext"], 1);
  mount(["eng", "mechBgtext", "mechBtn"], 2);
  mount(["soft", "softBgtext", "softBtn"], 3);

  return (
    <>
      <ColorProvider hsl={{ h: 200, s: 100, l: 50 }}>
        <Box stateHolder={mounters.me} isVertical={false}>
          <BgText stateHolder={mounters.meBgtext} text={BgTextList.me}></BgText>

          <div class={styles.HomeBoxInner}>
            <BackBtn
              stateholder={mounters.backHomeBtn}
              name={"Home"}
              onClick={() => {
                dismount(["backHomeBtn", "mePage"], 0);
                mount(["eng", "meBtn"], 1);
              }}
            ></BackBtn>

            <MePage s={mounters}></MePage>

            <Button
              stateHolder={mounters.meBtn}
              onClick={() => {
                dismount(["eng", "meBtn"], 0);
                mount(["backHomeBtn", "mePage"], 1);
              }}
            >
              <p>Jack Kirby</p>
            </Button>
          </div>
        </Box>
      </ColorProvider>

      <ColorProvider hsl={{ h: 250, s: 100, l: 77 }}>
        <Box stateHolder={mounters.eng} isVertical={false}>
          <ColorProvider hsl={{ h: 250, s: 100, l: 77 }}>
            <Box stateHolder={mounters.mech} isVertical={true}>
              <BgText
                stateHolder={mounters.mechBgtext}
                text={BgTextList.mech}
              ></BgText>

              <BackBtn
                stateholder={mounters.backHomeBtn}
                name={"Home"}
                onClick={() => {
                  dismount(["backHomeBtn", "mechPage"], 0);
                  mount(["me", "mechBtn"], 1);
                  mount(["soft"], 2);
                }}
              ></BackBtn>

              <Button
                stateHolder={mounters.mechBtn}
                onClick={() => {
                  dismount(["soft"], 0);
                  dismount(["me", "mechBtn"], 1);
                  mount(["mechPage", "backHomeBtn"], 2);
                }}
              >
                <p>Mechanical Engineer</p>
              </Button>

              <MechanicalPage></MechanicalPage>
            </Box>
          </ColorProvider>

          <ColorProvider hsl={{ h: 12, s: 82, l: 50 }}>
            <Box stateHolder={mounters.soft} isVertical={true}>
              <BgText
                stateHolder={mounters.softBgtext}
                text={BgTextList.soft}
              ></BgText>

              <BackBtn
                stateholder={mounters.backHomeBtn}
                name={"Home"}
                onClick={() => {
                  dismount(["backHomeBtn", "softPage"], 0);
                  mount(["me", "softBtn"], 1);
                  mount(["mech"], 2);
                }}
              ></BackBtn>

              <Button
                stateHolder={mounters.softBtn}
                onClick={() => {
                  dismount(["mech"], 0);
                  dismount(["me", "softBtn"], 1);
                  mount(["backHomeBtn", "softPage"], 2);
                }}
              >
                <p>Software Engineer</p>
              </Button>

              <SoftwarePage></SoftwarePage>

              <HychainPage></HychainPage>

              <HeatmyhomePage></HeatmyhomePage>

              <AccordPage></AccordPage>

              <PersonalPage></PersonalPage>
            </Box>
          </ColorProvider>
        </Box>
      </ColorProvider>
    </>
  );
}

export default App;
