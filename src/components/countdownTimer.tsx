 import { useState, useEffect, useRef, FormEventHandler } from 'react';
 import './countdownTimer.css';

function CountdownTimer() {


    const interval = useRef<number>(60);
    const intervalRef = useRef<number>();
    const [timeLeft, setTimeLeft] = useState(interval.current); 
    const [isActive, setIsActive] = useState(false);


   useEffect(() => {
        if(!isActive){
             clearInterval(intervalRef.current);
           return;
         }
        if(timeLeft >= 0){
             intervalRef.current = setInterval(() => {
                setTimeLeft(s => {
                    if(s - 1 == 0){
                       setIsActive(false);
                    }
                     return s-1;
                });
            },1000)
         }

     },[isActive])  

    const resetCountdown = () =>  {
         setTimeLeft(interval.current);
     }

    const updateInterval : FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
         const form = e.target as HTMLFormElement;
        interval.current = parseInt(form.startTimer.value)
        form.timerStart.value = "";
         resetCountdown();
     } 
    return (
        <section className="countdown">
             <form className="new-countdown-form" onSubmit={updateInterval}>
             </form>
           {timeLeft}
            <div className="button">
                <button disabled={timeLeft <= 0 } onClick={()=>{setIsActive(p => !p)}}>
                     {isActive ? 'pause' : 'play'}
                </button>
                <button  onClick={resetCountdown}>
                    restart
                </button>
            </div>
        </section>
     );
}


 export default CountdownTimer;



// import { useState, useEffect, useRef, FormEventHandler } from 'react';
// import './countdown-timer.css';
// import DigitalDisplay from './digital-display';

// function CountdownTimer() {
//     const duration = useRef<number>(60)
//     const [timeLeft, setTimeLeft] = useState(duration.current);
//     const [isActive, setIsActive] = useState(false);
//     const intervalRef = useRef<number>();


//     useEffect(()=> {
//         if(!isActive){
//             clearInterval(intervalRef.current);
//             return;
//         }

//         if(timeLeft >= 0){
//             intervalRef.current = setInterval(() => {
//                 setTimeLeft(t => {
//                     if(t-1 == 0){
//                         setIsActive(false);
//                     }
                        
//                     return t-1;
//                 });
//             }, 1000)
//         }
//     }, [isActive])

//     const resetCountdown = ()=>{
//         setTimeLeft(duration.current);
//     }

//     const updateDuration: FormEventHandler<HTMLFormElement> = (e) => {
//         e.preventDefault();
//         const form = e.target as HTMLFormElement;
//         duration.current = parseInt(form.timerStart.value);
//         form.timerStart.value = '';
//         resetCountdown();
//       }

//     return (
//         <div className="countdown-container">
//              <form className="new-countdown-form" onSubmit={updateDuration}>
//                 <input name="timerStart" type="number" placeholder='Enter duration (s)'/>
//             </form>
//             <DigitalDisplay totalSeconds={timeLeft}/>
//             <div className="button-container">
//                 <button disabled={timeLeft<=0   }className='material-symbols-outlined' onClick={()=>{setIsActive(a => !a)}}>
//                     {isActive ? 'pause' : 'play_arrow'}
//                 </button>
//                 <button className='material-symbols-outlined' onClick={resetCountdown}>
//                     restart_alt
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default CountdownTimer;