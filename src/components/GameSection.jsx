import React from 'react'

function GameSection({dieFaces, rollDice, tenzies}) {
    return (
        <>
            <div id="game-section" className="info">
                {dieFaces}
            </div>
            <div className="info">
                <button id="game-button" onClick={rollDice}>{tenzies ? "You Won!" : "Roll Dice"}</button>
            </div>
        </>
    )
}

export default GameSection