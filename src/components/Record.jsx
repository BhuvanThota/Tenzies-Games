import React from 'react'

function Record(props) {
    return (
        <>
            {props.recordShow && <div className="record-info" onClick={props.handleRecord}>
                <h3>⭐⭐⭐Personal Record⭐⭐⭐ </h3>
                <h3>Best Rolls: {props.record.rollCount}  </h3>
                <h3>
                    <span>Best Time: </span>
                    {props.record.timer.minutes.toString().padStart(2, "0")}<span className='mini'>min </span>:
                    {props.record.timer.seconds.toString().padStart(2, "0")}<span className='mini'>sec </span>:
                    {props.record.timer.milliseconds.toString().padStart(2, "0")}<span className='mini'>msec </span>
                </h3>
            </div>}
        </>
    )
}

export default Record;