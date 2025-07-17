import React, { useState, useEffect } from 'react';
import { use } from 'react';

const AnimatedCard = (props) => {
  return(
    <div className={`flipCard ${props.animation}`} onClick={props.onClick} style={{backgroundColor: props.style.color, borderColor:props.style.borderColor, width:"100%"}}>
      <span style={{color:"black", fontSize: props.style.fontSize}}>{props.digit}</span>
    </div>
  )
};

// function component
const StaticCard = (props) => (
  <div style={{borderColor:props.borderColor, width:"100%"}} className={props.position}>
    <span style={{color:"black", fontSize: props.style?.fontSize}}>{props.digit}</span>
  </div>
);

const Digit = (props) => {	
    const [shuffle, setShuffle] = useState(false);
    let max = props.max; 
        if(props.name==='month1' &&  props.digit0=== 1) max = 2
        else if(props.name==='day1' && props.digit0=== 3) max = 1
        else max=props.max;
    
    const handleIncrement = () => {
                if(props.name==='month1' &&  props.digit0=== 1) max = 2
        else if(props.name==='day1' && props.digit0=== 3) max = 1
        else max=props.max;
        setTimeout(() => {
            props.setDigit(prev => (prev + 1) > max ? 0 : prev + 1);
            setShuffle(prev => !prev);
        }, 100); 
        //console.log('Incremented hours to:', props.digit + 1);

    };
    // assign digit values
    let previousDigit ;//= props.digit===0 ? max : props.digit - 1;
    previousDigit= props.digit===0 ? max : props.digit - 1;
    

    useEffect(() => {
          if (props.name === 'month1' && props.digit0 === 1 && props.digit > 2) {
    // Si el dígito actual es mayor que 2, animar y poner a 0

    setTimeout(() => {
      setShuffle(prev => !prev); // activa animación
      //setTimeout(() => {
        props.setDigit(0);
      }, 200); // espera un poco para que se vea el flip antes de poner a 0*/
    //}
  }
        else if(props.name==='day1' && props.digit0=== 3 && props.digit>1){
            handleIncrement();
        }
    }, [props.digit0]);


    // shuffle digits
    const digit1 = shuffle ? previousDigit : props.digit;
    const digit2 = !shuffle ? previousDigit : props.digit;

    // shuffle animations
    const animation1 = shuffle ? 'fold' : 'unfold';
    const animation2 = !shuffle ? 'fold' : 'unfold';
    

  return (
    <div className="flipClock" onClick={handleIncrement} style={{ }}>
        <div className={'flipUnitContainer'} style={{width: props.style.boxWidth, height: props.style.boxHeight, backgroundColor: props.style.color, borderColor: props.style.borderColor}}>
        <StaticCard position={'upperCard'} digit={props.digit} borderColor={props.style.borderColor} style={props.style}/>
        <StaticCard position={'lowerCard'} digit={previousDigit} borderColor={props.style.borderColor} style={props.style}/>
        <AnimatedCard digit={digit1} animation={animation1}  style={props.style}/>
        <AnimatedCard digit={digit2} animation={animation2} style={props.style}/>
        </div>
    </div>
  );
};

export default Digit;