import React ,{ useState} from 'react';

import redPath from "./mixkit-electronic-retro-block-hit-2185.wav";
import  greenPath from "./mixkit-arcade-retro-jump-223.wav";
import bluePath from "./mixkit-extra-bonus-in-a-video-game.wav";
import yellowPath from "./mixkit-player-jumping-in-a-video-game-2043.wav";
import lostGame from "./zapsplat_multimedia_game_tone_hard_with_playful_high_end_descending_103174.mp3";
var colorsPlayed = [];  // strings of all the colors that were played by the computer


export default function Game(){
   
    const [mode, setMode] = useState("playing");               // mode = 'play' || 'userTurn'
    const [gameOn, setGameOn] = useState(true);
    const [gameIndex, setGameIndex] = useState(-1);
    const [score, setScore] = useState(0);
    const colors = ["red", "green", "blue", "yellow"];
    var colorButtons = [];              // all 4 game buttons

    colorButtons = initColorButtons(colorButtons);

    function initColorButtons(colorButtons){
        const redButton = <button className='topLeftRed button' name = "red" onClick={handleClick}></button>;
        colorButtons.push(redButton);
        
        const greenButton = <button className='topRightGreen button' name = "green" onClick={handleClick}></button>;
        colorButtons.push(greenButton);
        
        const blueButton = <button className='bottomLeftBlue button' name = "blue" onClick={handleClick}></button>;
        colorButtons.push(blueButton);
        
        const yellowButton = <button className='bottomRightYellow button' name = "yellow" onClick={handleClick}></button>;
        colorButtons.push(yellowButton);
        return colorButtons;

    }

    function audioAndOpacity(color){

        if (color === "red"){
            return new Promise((resolve, reject)=> {
            setTimeout(() => {
                var element = document.getElementsByClassName('topLeftRed');
                element[0].style.opacity = 0.5;
                var redAudio = new Audio(redPath);
                redAudio.addEventListener("canplaythrough", () => {
                    redAudio.play();
                })
                setTimeout(() => {
                    element[0].style.opacity = 1;
                    resolve();
                }, 500);

                }, 250);
            });
        }
        else if (color === "green"){
            return new Promise((resolve, reject)=>{

            setTimeout(() => {
                var element = document.getElementsByClassName('topRightGreen');
                element[0].style.opacity = 0.5;
                var greenAudio = new Audio(greenPath);
                greenAudio.addEventListener("canplaythrough", () => {
                    greenAudio.play();
                })
                setTimeout(() => {
                    element[0].style.opacity = 1;
                    
                    resolve();
                }, 500);

                }, 250);
            });
        }
        else if (color === "blue"){
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                    var element = document.getElementsByClassName('bottomLeftBlue');
                    element[0].style.opacity = 0.5;
                    var blueAudio = new Audio(bluePath);
                    blueAudio.addEventListener("canplaythrough", () => {
                        blueAudio.play();
                    })
                    setTimeout(() => {
                        element[0].style.opacity = 1;
                        
                        resolve();
                    }, 500);

                }, 250);
            });

        }
        else if (color === "yellow"){
            return new Promise((resolve, reject)=>{
            setTimeout(() => {
                var element = document.getElementsByClassName('bottomRightYellow');
                element[0].style.opacity = 0.5;
                var yellowAudio = new Audio(yellowPath);
                yellowAudio.addEventListener("canplaythrough", () => {
                    yellowAudio.play();
                })
                setTimeout(() => {
                    
                    element[0].style.opacity = 1;
                    resolve();
                }, 500);
    
                }, 250);
        }); 
    }
    else{
        alert("not found");
    }
}


    async function handleClick(event){
        var i;
        
        //alert(gameIndex);
        if (mode === "userTurn"){
            const color = event.currentTarget.name;
            
             if (color === colorsPlayed[gameIndex]){
                             
                    try{
                        await audioAndOpacity(color);
                    }
                    catch(error){
                        console.log("Error when calling 'audioAndOpacity' inside 'handleClick': ", error);
                    }
                    if (gameIndex === colorsPlayed.length - 1){
                        setGameIndex(-1);
                        setScore(score + 1);
                        setMode("playing");
                    }
                    else {
                        try {
                            await incIndex();
                        }
                        catch(err){
                            console.log("Error: ", err);
                        }
                        
                    }
           
            }
            else {
                
                var audio = new Audio(lostGame);
                audio.play();
                colorsPlayed = [];
                setGameIndex(-1);
                setGameOn(false);
                
            }

        }
        
    }

    function incIndex(ms){
        return new Promise((resolve, reject)=>{
                setGameIndex(gameIndex + 1);
                resolve();
            
        });
    }

    function wait(ms){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve();
            }, ms);
        });
    }


    async function playButtonSounds(){
        //red, green, blue, yellow
        let i = 0;



        //alert("in play sounds: colorsPlayed = " + colorsPlayed);
        if (mode === "playing"){
            try {
                await wait(300);
                
            }
            catch(error){
                console.log("Error in 'wait': ", error);
            }
            for (i = 0; i < colorsPlayed.length; i++){
                try{
                    await audioAndOpacity(colorsPlayed[i]);
                }
                catch(error){
                    console.log("Error when calling 'audioAndOpacity' inside 'playButtonSounds': ", error);
                }
             }
        }
    
}
    
    function startGame(){
        if (mode === "playing"){
            
            setGameOn(true);
            const newColor = colors[Math.floor(Math.random() * 4)];
            colorsPlayed = [...colorsPlayed, newColor];
            playButtonSounds();
            setGameIndex(gameIndex + 1);
            setMode("userTurn");
            
            
        }
    

    return null;
}

    function playAgain(){
        setScore(0);
        setGameOn(true);
        setMode("playing");
    }

    return (<div>
        <Buttons buttons = {colorButtons} score = {score} gameOn = {gameOn} playAgain = {playAgain}/>
        
        {gameOn && mode === "playing" && startGame()}

        </div>);
    }

function Buttons(props){
    
    return (<div className = "game">
        <div className = "row">
            {props.buttons[0]}
            {props.buttons[1]}
        </div>

        <div className = "row">
            {props.buttons[2]}
            {props.buttons[3]}
        </div>
        <div className = "score">score:{props.score}</div>
        <div className="simon">SIMON</div>
        {!props.gameOn && <button className = "tryAgain" onClick = {props.playAgain}>Try Again</button>}

    </div>);
}