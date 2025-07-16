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
    let max = props.max; // Maximum digit value, e.g., 9 for hours, 5 for minutes
    //(props.name==='month1' &&  props.digit0=== 1) ? max = 2: max=props.max;
    //(props.name==='day1' && props.digit0=== 3) ? max = 1: max=props.max;
    //(props.name==='month1' && props.digit0=== 2) ? max = 3: max=props.max;
        if(props.name==='month1' &&  props.digit0=== 1) max = 2
        else if(props.name==='day1' && props.digit0=== 3) max = 1
        else max=props.max;
    
    const handleIncrement = () => {
                if(props.name==='month1' &&  props.digit0=== 1) max = 2
        else if(props.name==='day1' && props.digit0=== 3) max = 1
        else max=props.max;
        //previousDigit = props.digit===0 ? max : props.digit - 1;
        /*if(props.name==='month1' &&  props.digit0=== 1) max = 2
        else if(props.name==='day1' && props.digit0=== 3) max = 1
        else max=props.max; */
        //(props.name==='month1' &&  props.digit0=== 1) ? max = 2: max=props.max;
        //(props.name==='day1' && props.digit0=== 3) ? max = 1: max=9;
        //(props.name==='month1' &&  props.digit0=== 1) ? max = 2: max=props.max;
        //(props.name==='day1' && props.digit0=== 3) ? max = 1: max=props.max;
        //let max = 9;
        //console.log('Digit:', props.digit, 'Max:', max, " Digit0:", props.digit0);
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
    //if (props.digit > 2) {
    setTimeout(() => {
      setShuffle(prev => !prev); // activa animación
      //setTimeout(() => {
        props.setDigit(0);
      }, 200); // espera un poco para que se vea el flip antes de poner a 0*/
    //}
  }
        else if(props.name==='day1' && props.digit0=== 3 && props.digit>1){
            handleIncrement();
        }//else max=props.max; 

        // Reset shuffle state when digit changes
        //(props.name==='month1' &&  props.digit0=== 1) ? max = 2: max=props.max;
        //(props.name==='day1' && props.digit0=== 3) ? max = 1: max=props.max;
        //console.log('Digit:', props.digit, 'Max:', max, " Digit0:", props.digit0);
        //setShuffle(false);
    }, [props.digit0]);
    /*useEffect(() => {
        // Reset shuffle state when digit changes
        setShuffle(prev => !prev);
    }, [props.digit]);*/


    // shuffle digits
    const digit1 = shuffle ? previousDigit : props.digit;
    const digit2 = !shuffle ? previousDigit : props.digit;

    // shuffle animations
    const animation1 = shuffle ? 'fold' : 'unfold';
    const animation2 = !shuffle ? 'fold' : 'unfold';
    

  return (
    <div className="flipClock" onClick={handleIncrement} style={{ marginLeft: props.left, marginTop: props.style.top }}>
        <div className={'flipUnitContainer'} style={{width: props.style.boxWidth, height: props.style.boxHeight, backgroundColor: props.style.color, borderColor: props.style.borderColor}}>
        <StaticCard position={'upperCard'} digit={props.digit} borderColor={props.style.borderColor} style={props.style}/>
        <StaticCard position={'lowerCard'} digit={previousDigit} borderColor={props.style.borderColor} style={props.style}/>
        <AnimatedCard digit={digit1} animation={animation1}  style={props.style}/>
        <AnimatedCard digit={digit2} animation={animation2} style={props.style}/>
        </div>
    </div>
  );
};

/*const Digit = (props) => {
    //const [hours, setHours] = useState(0);
    const [digitShuffle, setDigitShuffle] = useState(false);

    const handleIncrement = () => {
        //let max = 9;
        props.setDigit(prev => (prev + 1) > props.max ? 0 : prev + 1);
        setDigitShuffle(prev => !prev);
        console.log('Incremented hours to:', props.digit + 1);
    };

    return (
        <div className="flipClock" onClick={handleIncrement} style={{ marginLeft: props.left, marginTop: props.style.top }}>
            <FlipUnitContainer digit={props.digit} shuffle={digitShuffle} onIncrement={handleIncrement} style={props.style} max={props.max}/>            
        </div>
    );
}*/

export default Digit;