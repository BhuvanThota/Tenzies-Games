import React from 'react'

function GameTitle({resetGame, handleRecordShow}) {
    return (
        <>
            <button className='restart' onClick={resetGame} ></button>
            <button className='high-score' onClick={handleRecordShow}></button>
            <div id="game-info" className="info">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
        </>
    )
}

export default GameTitle