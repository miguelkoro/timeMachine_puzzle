import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import Digit from './Digit.jsx';

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [processingSolution, setProcessingSolution] = useState(false);

  const[backgroundChange, setBackgroundChange] = useState(false);

  const [light, setLight] = useState("off");
  const [containerWidth, setContainerWidth] = useState(0);//
  const [containerHeight, setContainerHeight] = useState(0);//
  const [containerMarginTop, setContainerMarginTop] = useState(0);//
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);//
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [lightWidth, setLightWidth] = useState(0); //
  const [lightHeight, setLightHeight] = useState(0); //
  const [lightLeft, setLightLeft] = useState(0);//
  const [lightTop, setLightTop] = useState(0);//

  const [year0, setYear0] = useState(0);
  const [year1, setYear1] = useState(0);
  const [year2, setYear2] = useState(0);
  const [year3, setYear3] = useState(0);
  const [year4, setYear4] = useState(0);
  const [month0, setMonth0] = useState(0);
  const [month1, setMonth1] = useState(0);
  const [day0, setDay0] = useState(0);
  const [day1, setDay1] = useState(0);
  const [hour0, setHour0] = useState(0);
  const [hour1, setHour1] = useState(0);
  const [minute0, setMinute0] = useState(0);
  const [minute1, setMinute1] = useState(0);
  const [second0, setSecond0] = useState(0);
  const [second1, setSecond1] = useState(0);


 


  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize(){
    if((props.appHeight === 0)||(props.appWidth === 0)){
      return;
    }

    let aspectRatio = 4 / 3;
    let _keypadWidth = Math.min(props.appHeight * aspectRatio, props.appWidth);
    let _keypadHeight = _keypadWidth / aspectRatio;

    let _lockWidth = Math.min(props.appHeight * aspectRatio, props.appWidth) ;
    let _lockHeight = _lockWidth / aspectRatio;

    let _containerWidth = _lockWidth *0.8;
    let _containerHeight = _lockHeight *0.8;


    let _containerMarginLeft=0.03 * _lockWidth;
    let _containerMarginTop=0.68 * _lockHeight;

    let _boxWidth = _lockWidth * 0.7;
    let _boxHeight = _lockHeight * 0.7;

    //let _backgroundNokWidth = _lockWidth * 0.8;
    //let _backgroundNokHeight = _lockHeight * 0.8;

    let _lightWidth;
    let _lightHeight;
    let _lightLeft;
    let _lightTop;



    switch(appSettings.skin){
      case "RETRO":
        _containerMarginTop = 0;
        _containerHeight = _lockHeight *0.55;
        _lightWidth = _lockWidth * 0.18;
        _lightHeight = _lockHeight *0.18;
        _lightLeft = _lockWidth * 0;
        _lightTop =  _lockHeight * -0.14;
        break;
      case "FUTURISTIC":
        _containerMarginTop = 0;//_lockHeight*0;
        _containerHeight = _lockHeight *0.605;
         _lightWidth = _lockWidth*0.9;
        _lightHeight = _lockHeight*0.6;
        _boxHeight = _lockHeight * 0.9;
        _boxWidth = _lockWidth * 0.9;

        break;
      default:
        _lightWidth = _lockWidth * 0.08;
        _lightHeight = _lockHeight * 0.08;
        _lightLeft =  _lockWidth  * 0.61;
        _lightTop =  _lockHeight  * 0.03
    }

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setContainerMarginTop(_containerMarginTop);
    setContainerMarginLeft(_containerMarginLeft);

    setBoxWidth(_boxWidth);
    setBoxHeight(_boxHeight);

    setLightWidth(_lightWidth);
    setLightHeight(_lightHeight);
    setLightLeft(_lightLeft);
    setLightTop(_lightTop);
  }

  const checkSolution = () => {
    if (processingSolution) {
      return;
    }

    let audio = document.getElementById("audio_beep");
    audio.currentTime = 0; // Reinicia el audio
    audio.play();

    setProcessingSolution(true);
   
    escapp.checkNextPuzzle(solution, {}, (success, erState) => {
          Utils.log("Check solution Escapp response", success, erState);
          try {
            setTimeout(() => {
              changeBoxLight(success, solution);
            }, 700);
          } catch(e){
            Utils.log("Error in checkNextPuzzle",e);
          }
        });
  }

  const changeBoxLight = (success, solution) => {
    let audio;
    let afterChangeBoxLightDelay = 2500;

    if (success) {
      audio = document.getElementById("audio_success");
      setLight("ok");
      setAudioAmplitude(amplitudeMapped); // Actualiza la amplitud del audio para la visualización
    } else {
      audio = document.getElementById("audio_failure");
      setLight("nok");
      reset(); //
    }

    setTimeout(() => {
      if(!success){
        setLight("off");
        setProcessingSolution(false);
      }else{
        
        if(appSettings.actionAfterSolve === "PLAY_SOUND"){
          //playFrequency(frequencyMapped); // Reproduce el sonido de la frecuencia
          audio = document.getElementById("audio_post_success");
          //handlePlayAudioAndVisual();
          
          audio.play();
          visualizeAudio(audio);
          /*setTimeout(() => {
            props.onKeypadSolved(solution); //Cambiar
            Utils.log("Puzzle solved, sending solution");
            
          }, appSettings.timeSoundAfterSolve); */
          audio.onended = () => {
            props.onKeypadSolved(solution);
          }
          
        }else{
          props.onKeypadSolved(solution); //Cambiar
          
        }
      }
    }, afterChangeBoxLightDelay);
    
    //!success ? audio.play() : playFrequency(frequencyMapped); // Reproduce el sonido de la frecuencia
    audio.play();
  }

  const yearStyle = {
    top:("0%"),
    color:("#d0c8c8"),
    borderColor:(""),
    boxHeight: "5vmin" ,
    boxWidth:"3vw" ,
    fontSize : "1.5rem"
  }
  

  //Pone la imagen del fondo
  let backgroundImage = 'url("' + appSettings.background + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundChange ? 'url("' + appSettings.backgroundAfter + '")' : 'url("' + appSettings.backgroundBefore + '")' }}>
        <div className="lockContainer" style={{backgroundImage: 'url('+appSettings.backgroundTimeMachine+')', width: containerWidth, height: containerHeight, position: "relative"}}>
        
          <div style={{position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", height: containerHeight*0.2, top: "15%", left: "25%", gap: "0.5vw"}}>
              {/*<Ray boxHeight={boxHeight} boxWidth={boxWidth} checking={checking} 
                frequency={frequencyMapped} amplitude={amplitudeMapped} wavelength={wavelengthMapped}/>*/}

            {/*<FlipClock/>*/}
            <Digit name={"year0"} checking={processingSolution} left={"0%"} style={yearStyle} digit={year0} setDigit={setYear0} max={9}/>
            <Digit name={"year1"} checking={processingSolution} left={"0%"} style={yearStyle} digit={year1} setDigit={setYear1} max={9}/>
            <Digit name={"year2"} checking={processingSolution} left={"0%"} style={yearStyle} digit={year2} setDigit={setYear2} max={9}/>            
            <Digit name={"year3"} checking={processingSolution} left={"0%"}  style={yearStyle} digit={year3} setDigit={setYear3} max={9}/>
            <Digit name={"year4"} checking={processingSolution} left={"0%"} style={yearStyle} digit={year4} setDigit={setYear4} max={9}/>
          </div>
        </div>

      <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
      <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
      <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      <audio id="audio_post_success" src={appSettings.soundAfterSolve} autostart="false" preload="auto" />

 
    </div>);
};

export default MainScreen;