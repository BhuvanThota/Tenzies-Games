import React from 'react'


function StopWatch({timer,rollCount}) {
    return (
        <div>
            <h3 className="stopwatch-time"> Rolls: {rollCount}</h3>
            <h3 className="stopwatch-time">
                <span>Time: </span>
                {timer.minutes.toString().padStart(2, "0")}<span className='mini'>min </span>:
                {timer.seconds.toString().padStart(2, "0")}<span className='mini'>sec </span>:
                {timer.milliseconds.toString().padStart(2, "0")}<span className='mini'>msec </span>
            </h3>
        </div>
    )
}

export default StopWatch