import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Record from './components/Record'
import StopWatch from './components/StopWatch'
import GameTitle from './components/GameTitle'
import GameSection from './components/GameSection'


function App() {
  const [dieValues, setDieValues] = React.useState(randomNumArr)
  const [rollCount, setRollCount] = React.useState(1)
  const [tenzies, setTenzies] = React.useState(false)
  const [time, setTime] = React.useState(0);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = React.useState(false);
  const [recordShow, setRecordShow] = React.useState(false);
  const [tenziesPR, setTenziesPR] = React.useState( ()=> (JSON.parse(localStorage.getItem("tenziesPR")) || {
      rollCount: 100, timer : {
        minutes: 99,
        seconds: 99,
        milliseconds: 99
      } })
  )

  

  React.useEffect(() => {
    let allHeld = dieValues.every(die => die.isHeld)
    let allSameValues = dieValues.every(die => die.value === dieValues[0].value)
    if (allHeld && allSameValues) {
      setTenzies(true)
      console.log("You Won!")
      setIsRunning(isRunning => !isRunning)
      setRecordShow(true)
    }

    let anyHeld = dieValues.some(die => die.isHeld)
    if (anyHeld && !isRunning) {
      setIsRunning(isRunning => !isRunning)
    }
  }, [dieValues]
  )


  React.useEffect(
    ()=>{
      if(tenzies && tenziesPR.rollCount > rollCount){
        setTenziesPR(tenziesPR => ({ ...tenziesPR, 
                                    rollCount: rollCount}))
      }
      
      if(tenzies &&  tenziesPR.timer.minutes > timer.minutes){
        setTenziesPR(tenziesPR => ({ ...tenziesPR, timer:{...timer}}))
      }else if (tenzies &&  tenziesPR.timer.minutes === timer.minutes){
          if(tenziesPR.timer.seconds > timer.seconds){
            setTenziesPR(tenziesPR => ({ ...tenziesPR, timer:{...timer}}))
          }else if(tenziesPR.timer.seconds === timer.seconds){
            if (tenziesPR.timer.milliseconds > timer.milliseconds){
              setTenziesPR(tenziesPR => ({ ...tenziesPR, timer:{...timer}}))
            }
          }
      }
    
      console.log(tenziesPR)
    },[tenzies]
  )

  React.useEffect(
    () =>   localStorage.setItem("tenziesPR" ,JSON.stringify(tenziesPR))
    ,[tenziesPR]
  )


///////////////////    Generate Random dice array  //////////////////// 

  function randomNumArr() {
    const nums = []
    for (let i = 0; i < 10; i++) {
      nums.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return nums
  }

///////////////////   Hold Dice  //////////////////// 

  function holdDieFace(id) {
    setDieValues(dieValues => dieValues.map((die) =>
      (id === die.id) ? { ...die, isHeld: !die.isHeld } : die))
  }

///////////////////    Render Dice  //////////////////// 

  const dieFaces = dieValues.map((die) =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleClick={() => holdDieFace(die.id)} />)

///////////////////    Record Show  //////////////////// 

  function handleRecordShow(){
    setRecordShow(recordShow => !recordShow)
  }

///////////////////    Roll Dice   //////////////////// 

  function rollDice() {
    if(!tenzies){
      if (!isRunning) {
        setIsRunning(isRunning => !isRunning)
      }
      setRollCount((rollCount) => rollCount += 1)
      const newValues = randomNumArr()
      setDieValues(dieValues => dieValues.map((die, ind) =>
        (die.isHeld === false) ? { ...newValues[ind], id: die.id } : die))
    }
  }

///////////////////    Reset Game   //////////////////// 

  function resetGame() {
    setDieValues(randomNumArr)
    setTenzies(false)
    setRollCount(1)
    setTime(0)
    setIsRunning(false)
    setRecordShow(false)

  }

  ///////////////////      StopWatch    //////////////////// 


  React.useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  //Timer
  const timer = {
    minutes: Math.floor((time % 360000) / 6000),
    seconds: Math.floor((time % 6000) / 100),
    milliseconds: time % 100
  }


///////////////////    Final Render  //////////////////// 

  return (
    <>
      {tenzies && <Confetti gravity={0.3} />}
      <main>

        <GameTitle resetGame={resetGame} handleRecordShow={handleRecordShow} />

        <StopWatch timer={timer} rollCount={rollCount}/>

        <Record recordShow={recordShow} record={tenziesPR} />

        <GameSection dieFaces={dieFaces} rollDice={rollDice} tenzies={tenzies}/>

      </main>
    </>
  );
}

export default App;
