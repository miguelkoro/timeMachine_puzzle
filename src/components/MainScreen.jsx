import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import Digit from './Digit.jsx';
import Electricity from './Electricity.jsx';

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

  // Estados para el carrusel de texto
  const [textPosition, setTextPosition] = useState(0); // 0 = texto1 visible, 100 = texto2 visible
  const [isAnimating, setIsAnimating] = useState(false);


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

  // Funciones para el carrusel de texto
  const moveTextUp = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTextPosition(0); // Muestra texto1
    setTimeout(() => setIsAnimating(false), 500); // Duración de la animación
  };

  const moveTextDown = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTextPosition(100); // Muestra texto2
    setTimeout(() => setIsAnimating(false), 500); // Duración de la animación
  };

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
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const monthStyle = {
    top:("0%") ,
    color:("#487a53"),
    borderColor:("#37553e"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const dayStyle = {
    top:("-175%") ,
    color:("#d4a274"),
    borderColor:("#c7762a"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const hourStyle = {
    top:("-90%") ,
    color:("#ae6a68"),
    borderColor:("#893330"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const minuteStyle = {
    top:("-90%") ,
    color:("#6eb0a9"),
    borderColor:("#3d7975"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const secondStyle = {
    top:("-90%") ,
    color:("#bb50d3"),
    borderColor:("#5d2b68"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }

  

  //Pone la imagen del fondo
  let backgroundImage = 'url("' + appSettings.background + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundChange ? 'url("' + appSettings.backgroundAfter + '")' : 'url("' + appSettings.backgroundBefore + '")' }}>
        <div className="lockContainer" style={{backgroundImage: appSettings.fullTimeMachine ? 'url('+appSettings.backgroundTimeMachineFull+')' : 'url('+appSettings.backgroundTimeMachine+')', width: containerWidth, height: containerHeight, position: "relative"}}>  
          {/*Year*/}     
           <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.2, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.24, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"year0"} checking={processingSolution} style={yearStyle} digit={year0} setDigit={setYear0} max={9}/>
            <Digit name={"year1"} checking={processingSolution} style={yearStyle} digit={year1} setDigit={setYear1} max={9}/>
            <Digit name={"year2"} checking={processingSolution} style={yearStyle} digit={year2} setDigit={setYear2} max={9}/>            
            <Digit name={"year3"} checking={processingSolution} style={yearStyle} digit={year3} setDigit={setYear3} max={9}/>
            <Digit name={"year4"} checking={processingSolution} style={yearStyle} digit={year4} setDigit={setYear4} max={9}/>
          </div>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.525, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"month0"} checking={processingSolution}  style={monthStyle} digit={month0} setDigit={setMonth0} max={1}/>
            <Digit name={"month1"} digit0={month0} checking={processingSolution} style={monthStyle} digit={month1} setDigit={setMonth1} max={9}/>
          </div>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.678, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"day0"} checking={processingSolution} style={dayStyle} digit={day0} setDigit={setDay0} max={3}/>
            <Digit name={"day1"} digit0={day0}  checking={processingSolution}  style={dayStyle} digit={day1} setDigit={setDay1} max={9}/>
          </div>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.375, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"hour0"} checking={processingSolution} style={hourStyle} digit={hour0} setDigit={setHour0} max={5}/>
            <Digit name={"hour1"} checking={processingSolution} style={hourStyle} digit={hour1} setDigit={setHour1} max={9}/>
          </div>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.525, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"minute0"} checking={processingSolution} style={minuteStyle} digit={minute0} setDigit={setMinute0} max={5}/>
            <Digit name={"minute1"} checking={processingSolution} style={minuteStyle} digit={minute1} setDigit={setMinute1} max={9}/>
          </div>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.675, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"second0"} checking={processingSolution}  style={secondStyle} digit={second0} setDigit={setSecond0} max={5}/>
            <Digit name={"second1"} checking={processingSolution}  style={secondStyle} digit={second1} setDigit={setSecond1} max={9}/>
          </div>
          <div className='lockContainer' style={{position: "absolute",backgroundImage: `url(${appSettings.switchImage})`,  width: lightWidth, height: lightHeight,  top:"62%", cursor:"pointer"}}/>
          <div className='lockContainer' style={{backgroundImage: `url(${appSettings.acbcBackground})`,  width: containerWidth*0.14, height: containerHeight*0.15,  top:"34.7%", left:"30.8%",}}>

        </div>

      </div>
        <div style={{position:"absolute"}}><Electricity 
          width={containerWidth*0.8} 
          height={containerHeight*0.6}
          startPoint={{ x: containerWidth*0.1, y: containerHeight*0.1 }}
          endPoint={{ x: containerWidth*0.1, y: containerHeight*0.5 }}
          animationSpeed={150}
          branches={3}
          maxBranches={8}
          branchLength={0.1}
          multipleRays={true}
          rayCount={2}
          color="#ff0080"
          strokeWidth={1.5}
          segments={15}
          glowEffect={true}
          animated={true}
          flickerIntensity={0.8}
          intensity={0.9}
        />
        </div>
        

      <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
      <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
      <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      <audio id="audio_post_success" src={appSettings.soundAfterSolve} autostart="false" preload="auto" />

 
    </div>);
};

export default MainScreen;