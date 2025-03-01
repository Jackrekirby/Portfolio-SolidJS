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
import { createSignal } from "solid-js";
import AuroraPage from "./pages/AuroraPage";

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
  auroraPage: false,
};

const setLoc = (loc) => {
  if(loc === undefined) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  } else {
    window.location.hash = loc
  }
  
};

function App() {
  if(window.location.hash == '#mechanical') { 
    initMountStates.me = false
    initMountStates.eng = true
  } else if(window.location.hash.startsWith('#software')) { 
    initMountStates.me = false
    initMountStates.eng = true
    initMountStates.mech = false
    initMountStates.soft = true
  }

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

  const [pageInTransition, setPageInTransition] = createSignal(true)

  const { mount, dismount } = mounterFncs(mounters);
  
  const setPageLoaded = (delayInSeconds) => {
    setTimeout(() => {
      // console.log('page loaded')
      setPageInTransition(false)
    }, delayInSeconds * 1000); 
  }

  if(window.location.hash == '#about') { 
    // console.log('#about')
    mount(["backHomeBtn", "mePage", "meBgtext", "mechBgtext", "mechBtn","soft", "softBgtext", "softBtn"], 1);
    setPageLoaded(2)
  } else if(window.location.hash == '#mechanical') { 
    // console.log('#mechanical')
    mount(["mechPage", "backHomeBtn", "mechBgtext", "meBgtext", "softBgtext", "softBtn", "meBtn"], 1);
    setPageLoaded(2)
  } else if(window.location.hash.startsWith('#software')) { 
    // console.log('#software')
    mount(["mechBgtext", "meBgtext", "softBgtext", "mechBtn", "meBtn"], 1);
    if(window.location.hash == '#software-hychain') {
      mount(["hychainPage"], 1)
    } else if(window.location.hash == '#software-heatmyhome') {
      mount(["heatmyhomePage"], 1)
    } else if(window.location.hash == '#software-accord') {
      mount(["accordPage"], 1)
    } else if(window.location.hash == '#software-personal') {
      mount(["personalPage"], 1)
    } else if(window.location.hash == '#software-aurora') {
      mount(["auroraPage"], 1)
    }  else {
      mount(["backHomeBtn", "softPage"], 1)
    }
    setPageLoaded(2)
  } else {
    mount(["meBtn", "meBgtext"], 1);
    mount(["eng", "mechBgtext", "mechBtn"], 2);
    mount(["soft", "softBgtext", "softBtn"], 3);
    setPageLoaded(4)
  }




  
  

  // 12 82 50 // red
  // 221, 15, 25 // grey

  const hsl = (h, s, l) => ({
    h,
    s,
    l,
  });

  return (
    <>
      <ColorProvider hue={215} saturation={18} lightness={57}>
        <Box stateHolder={mounters.me} isVertical={false}>
          <BgText stateHolder={mounters.meBgtext} text={'about'}></BgText>

          <div class={styles.HomeBoxInner}>
            <BackBtn
              stateholder={mounters.backHomeBtn}
              name={"Home"}
              onClick={() => {
                if(pageInTransition()) return
                setPageInTransition(true)
                dismount(["backHomeBtn", "mePage"], 0);
                mount(["eng", "meBtn"], 1);
                setLoc(undefined)
                setPageLoaded(2)
              }}
              width={"4rem"}
            ></BackBtn>

            <MePage s={mounters}></MePage>

            <Button
              stateHolder={mounters.meBtn}
              onClick={() => {
                if(pageInTransition()) return
                setPageInTransition(true)
                dismount(["eng", "meBtn"], 0);
                mount(["backHomeBtn", "mePage"], 1);
                setLoc('about')
                setPageLoaded(2)
              }}
            >
              <p>Jack Kirby</p>
            </Button>
          </div>
        </Box>
      </ColorProvider>

      <ColorProvider hue={250} saturation={64} lightness={75}>
        <Box stateHolder={mounters.eng} isVertical={false}>
          <ColorProvider hue={250} saturation={64} lightness={75}>
            <Box stateHolder={mounters.mech} isVertical={true}>
              <BgText
                stateHolder={mounters.mechBgtext}
                text={'mech'}
              ></BgText>

              <BackBtn
                stateholder={mounters.backHomeBtn}
                name={"Home"}
                onClick={() => {
                  if(pageInTransition()) return
                  setPageInTransition(true)
                  dismount(["backHomeBtn", "mechPage"], 0);
                  mount(["me", "mechBtn"], 1);
                  mount(["soft"], 2);
                  setLoc(undefined)
                  setPageLoaded(3)
                }}
                width={"4rem"}
              ></BackBtn>

              <Button
                stateHolder={mounters.mechBtn}
                onClick={() => {
                  if(pageInTransition()) return
                  setPageInTransition(true)
                  dismount(["soft"], 0);
                  dismount(["me", "mechBtn"], 1);
                  mount(["mechPage", "backHomeBtn"], 2);
                  setLoc('mechanical')
                  setPageLoaded(3)
                }}
              >
                <p>Mechanical Engineer</p>
              </Button>

              <MechanicalPage></MechanicalPage>
            </Box>
          </ColorProvider>

          <ColorProvider hue={200} saturation={100} lightness={50}>
            <Box stateHolder={mounters.soft} isVertical={true}>
              <BgText
                stateHolder={mounters.softBgtext}
                text={'soft'}
              ></BgText>

              <BackBtn
                stateholder={mounters.backHomeBtn}
                name={"Home"}
                onClick={() => {
                  if(pageInTransition()) return
                  setPageInTransition(true)
                  dismount(["backHomeBtn", "softPage"], 0);
                  mount(["me", "softBtn"], 1);
                  mount(["mech"], 2);
                  setLoc(undefined)
                  setPageLoaded(3)
                }}
                width={"4rem"}
              ></BackBtn>

              <Button
                stateHolder={mounters.softBtn}
                onClick={() => {
                  if(pageInTransition()) return
                  setPageInTransition(true)
                  dismount(["mech"], 0);
                  dismount(["me", "softBtn"], 1);
                  mount(["backHomeBtn", "softPage"], 2);
                  setLoc('software')
                  setPageLoaded(3)
                }}
              >
                <p>Software Engineer</p>
              </Button>

              <SoftwarePage></SoftwarePage>

              <AuroraPage></AuroraPage>

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
