let newGame = null;

let playerWins = 0;
let cpuWins = 0;
let roundNumber = 1;

let mouseIn = null;
let eventListenerAttached = false;
let drawOccurredOnce = false;

let playerKO = false;
let cpuKO = false;

let beginGameButton = document.getElementById('play-again-button');

beginGameButton.addEventListener('click', animateButton);

function animateButton (event) {
    event.preventDefault();

    let playAgainText = document.getElementById('play-again-button-text');

    this.animate(BUTTON_CLICK_KEYFRAMES, BUTTON_CLICK_ANIMATION);
    playAgainText.animate(BUTTON_TEXT_SHRINK_KEYFRAMES, BUTTON_TEXT_SHRINK_ANIMATION);
    
    setTimeout(clearPlayAgain, 600);
    setTimeout(beginGame, 600);
}

function beginGame(event) {   
    if (event !== undefined) {
        event.preventDefault();
    }
    
    let laserFrame = document.getElementById('player-laser-box');
    let playerLaser = document.getElementById('player-title');
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraits = document.getElementsByClassName('player-portraits');

    newGame = false;

    SELECT_YOUR_FIGHTER.play();

    laserFrame.animate(LASER_SWELL_KEYFRAMES, LASER_SWELL_ANIMATION);
    playerLaser.animate(LASER_SWELL_KEYFRAMES, LASER_SWELL_ANIMATION);

    if (eventListenerAttached === false) {
        for (let portraitFrame of portraitFrames) {
            portraitFrame.addEventListener('mouseover', removeFrameSlantIn);
            portraitFrame.addEventListener('mouseout', restoreFrameSlantOut);
        }

        for (let portrait of portraits) {
            portrait.addEventListener('mouseover', retainImageAngleIn);
            portrait.addEventListener('mouseout', retainImageAngleOut);
        }

        setTimeout(initialClickListenersAttach, 2200);
    }
}

function initialClickListenersAttach() {
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraits = document.getElementsByClassName('player-portraits');
    let fighters = document.getElementsByClassName('character-buttons');

    if (eventListenerAttached === false) {
        for (let portraitFrame of portraitFrames) {
            portraitFrame.addEventListener('click', clickChangeColor);
        }

        for (let fighter of fighters) {
            fighter.addEventListener('click', selectionPhase)
        }

        for (let portrait of portraits) {
            portrait.addEventListener('click', clickSwellPortrait);
        }
    }   
}

function selectionPhase(event) {
    event.preventDefault();

    let fighters = document.getElementsByClassName('character-buttons');

    DRUM.volume = 1;
    DRUM.play();

    let playerSelection = event.currentTarget.getAttribute('data-type');

    for (let i = 0; i < fighters.length; i++) {
        fighters[i].style.display = 'none';
    }

    playSelectionAudio(playerSelection);

    let cpuFighterNameAndNumber = cpuSelect();

    setTimeout(cpuSelectVisual, 2500, cpuFighterNameAndNumber);

    let fighterName =  Object.keys(cpuFighterNameAndNumber);
    let cpuSelection = fighterName[0];

    setTimeout(playSelectionAudio, 2500, cpuSelection);
    setTimeout(playDrum, 2500); 

    if (roundNumber === 1 && drawOccurredOnce === false) {
        setTimeout(roundAudio, 4000, roundNumber);
        setTimeout(setContenders, 5500, playerSelection, cpuSelection);
    } else {
        setTimeout(setContenders, 4000, playerSelection, cpuSelection); 
    }   
} 

function removeFrameSlantIn(event) {  
    let portraitFrame = event.currentTarget;

    if (mouseIn === null || mouseIn === false) {
        portraitFrame.animate(REMOVE_SLANT_KEYFRAMES, REMOVE_SLANT_ANIMATION);
    } else {
        portraitFrame.animate(REMOVE_SLANT_KEYFRAMES_STATIC, REMOVE_SLANT_ANIMATION_STATIC);
        mouseIn = false;
    }
    portraitFrame.style.border = '3px solid #ffcece';
    portraitFrame.style.boxShadow = '0 0 32px #ff002bf8';
}

function restoreFrameSlantOut(event) {
    event.preventDefault();

    let portraitFrame = event.currentTarget;

    portraitFrame.animate(RESTORE_SLANT_KEYFRAMES, RESTORE_SLANT_ANIMATION);
    portraitFrame.style.border = '2px solid #444444';
    portraitFrame.style.boxShadow = 'none';
}

function clickChangeColor(event) {
    event.preventDefault();

    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraitFrame = event.currentTarget;

    portraitFrame.removeEventListener('mouseover', removeFrameSlantIn);
    portraitFrame.removeEventListener('mouseout', restoreFrameSlantOut);  
    portraitFrame.addEventListener('mouseout', selectionRetainFrameShapeOut);
    portraitFrame.addEventListener('mouseover', mouseHoverCheck);
    portraitFrame.style.border = '3px solid #ceffda';
    portraitFrame.style.boxShadow = '0 0 32px #00ff80f8';

    for (let frame of portraitFrames) {
        frame.removeEventListener('click', clickChangeColor);
    }
}

function selectionRetainFrameShapeOut(event) {
    let portraitFrame = event.currentTarget;

    portraitFrame.style.transform = 'skewX(0deg)';
    portraitFrame.style.width = '90%';

    mouseIn = false;
}

function mouseHoverCheck() {
    mouseIn = true;
}


function retainImageAngleIn(event) {
    event.preventDefault();

    let portrait = event.currentTarget;
    
    if (mouseIn === undefined || mouseIn === false) {
        portrait.animate(RETAIN_ANGLE_KEYFRAMES, RETAIN_ANGLE_ANIMATION);
    } else {
        portrait.animate(RETAIN_ANGLE_KEYFRAMES_STATIC, RETAIN_ANGLE_ANIMATION_STATIC);
        mouseIn === false;
    }

    portrait.style.boxShadow = '0 0 32px #ff002bf8 inset';
}

function retainImageAngleOut(event) {
    event.preventDefault();

    let portrait = event.currentTarget;
    
    portrait.animate(RETAIN_ANGLE_KEYFRAMES_OUT, RETAIN_ANGLE_ANIMATION_OUT);
    portrait.style.boxShadow = 'none';
}

function clickSwellPortrait(event) {
    event.preventDefault();
    
    let portraits = document.getElementsByClassName('player-portraits');
    let portrait = event.currentTarget;  

    portrait.removeEventListener('mouseover', retainImageAngleIn);
    portrait.removeEventListener('mouseout', retainImageAngleOut);
    portrait.addEventListener('mouseout', selectionRetainImageShapeOut);

    portrait.style.boxShadow = '0 0 32px #00ff80f8 inset';
    portrait.animate(PORTRAIT_SWELL_KEYFRAMES, PORTRAIT_SWELL_ANIMATION);
    portrait.style.transform = 'scale(1)';

    for (let image of portraits) {
        image.removeEventListener('click', clickSwellPortrait);
    }

    eventListenerAttached = true;
}

function selectionRetainImageShapeOut(event) {
    event.preventDefault();
    
    let portrait = event.currentTarget;

    portrait.style.transform = 'skewX(360deg)';
    portrait.style.right = '-20px';
}


function playSelectionAudio(selection) {
    switch(selection) {
        case 'rock':
            ROCK_ANNOUNCE.play();
            break;
        case 'paper':
            PAPER_ANNOUNCE.play();
            break;
        case 'scissors':
            SCISSORS_ANNOUNCE.play();
            break;
        case 'lizard':
            LIZARD_ANNOUNCE.play();
            break;
        case 'spock':
            SPOCK_ANNOUNCE.play();
            break;
    }
}

function cpuSelect() {
    let cpuFighters = document.getElementsByClassName('cpu-portraits');
    
    let fighterNumber = Math.floor(Math.random() * 5);

    let cpuSelection = cpuFighters[fighterNumber];
    let cpuSelectionName = cpuSelection.getAttribute('id');
    let cpuNumberAndName = { [cpuSelectionName]: fighterNumber, };

    return cpuNumberAndName;
}

function playDrum() {
    DRUM.volume = 1;
    DRUM.play();
}

function roundAudio(roundNumber) {
    switch(roundNumber) {
        case 1:
            ROUND_ONE.play();
            break;
        case 2:
            ROUND_TWO.play();
            break;
        case 3:
            FINAL_ROUND.play();
            break;
    }
}

function cpuSelectVisual(cpuSelection) {
    let cpuPortraitFrames = document.getElementsByClassName('cpu-fighters');
    let cpuPortraits = document.getElementsByClassName('cpu-portraits');

    let fighterNumber = Object.values(cpuSelection);
    let cpuFighterNumber = fighterNumber[0];

    cpuPortraitFrames[cpuFighterNumber].animate(REMOVE_SLANT_KEYFRAMES_CPU, REMOVE_SLANT_ANIMATION_CPU);
    cpuPortraitFrames[cpuFighterNumber].style.transform = 'skewX(360deg)';
    cpuPortraitFrames[cpuFighterNumber].style.width = '90%';
    cpuPortraitFrames[cpuFighterNumber].style.border = '3px solid #ceffda';
    cpuPortraitFrames[cpuFighterNumber].style.boxShadow = '0 0 32px #00ff80f8';

    cpuPortraits[cpuFighterNumber].animate(RETAIN_ANGLE_KEYFRAMES_CPU, RETAIN_ANGLE_ANIMATION_CPU);
    cpuPortraits[cpuFighterNumber].style.transform = 'skewX(0deg)';
    cpuPortraits[cpuFighterNumber].style.left = '-20px';

    cpuPortraits[cpuFighterNumber].animate(PORTRAIT_SWELL_KEYFRAMES_CPU, PORTRAIT_SWELL_ANIMATION_CPU);
    cpuPortraits[cpuFighterNumber].style.transform = 'scaleX(-1) scaleY(1)';
    cpuPortraits[cpuFighterNumber].style.boxShadow = '0 0 32px #00ff80f8 inset';
}

function setContenders(playerSelection, cpuSelection) {
    ELECTRIC_SFX.volume = 0.5;
    
    let contenderFrames = document.getElementsByClassName('contenders');

    let playerContenderPortrait = document.getElementById('player-contender');
    let playerNameplate = document.getElementById('player-nameplate');

    let versusText = document.getElementById('versus-text');

    let cpuContenderPortrait = document.getElementById('cpu-contender');
    let cpuNameplate = document.getElementById('cpu-nameplate');

    let boutContainer = document.getElementById('bout-and-scoreboard-container-outer');

    if (window.innerWidth <= 507) {
        boutContainer.scrollIntoView({behavior: 'smooth'});
    }
    
    for (let frame of contenderFrames) {
        frame.style.border = '3px solid #ffcece';
        frame.style.boxShadow = '0 0 64px #ff002bf8, 0 0 32px #ff002bf8 inset';
    }

    playerContenderPortrait.style.background = `url(assets/images/${playerSelection}-square.jpg) no-repeat center center`;
    playerContenderPortrait.style.backgroundSize = '100% 100%';
    playerNameplate.innerText = playerSelection;

    versusText.style.color = '#ffe0e0';
    versusText.style.textShadow = '0 0 16px #ff002bf8';

    cpuContenderPortrait.style.background = `url(assets/images/${cpuSelection}-square.jpg) no-repeat center center`;
    cpuContenderPortrait.style.backgroundSize = '100% 100%';
    cpuContenderPortrait.style.transform = 'scaleX(-1)';
    cpuNameplate.innerText = cpuSelection;

    ELECTRIC_SFX.play();

    setTimeout(declareVictor, 1000, playerSelection, cpuSelection);
}

function declareVictor(playerSelection, cpuSelection) {
    let win = null;
    let draw = false;

    if (playerSelection === 'rock' && cpuSelection === 'paper') {
        ROCK_VS_PAPER_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'rock' && cpuSelection === 'scissors') {
        ROCK_VS_SCISSORS_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'rock' && cpuSelection === 'lizard') {
        ROCK_VS_LIZARD_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'rock' && cpuSelection === 'spock') {
        ROCK_VS_SPOCK_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'rock') {
        ROCK_VS_PAPER_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'scissors') {
        PAPER_VS_SCISSORS_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'lizard') {
        PAPER_VS_LIZARD_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'spock') {
        PAPER_VS_SPOCK_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'rock') {
        ROCK_VS_SCISSORS_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'paper') {
        PAPER_VS_SCISSORS_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'lizard') {
        SCISSORS_VS_LIZARD_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2700, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'spock') {
        SCISSORS_VS_SPOCK_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'rock') {
        ROCK_VS_LIZARD_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'paper') {
        PAPER_VS_LIZARD_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'scissors') {
        SCISSORS_VS_LIZARD_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2700, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'spock') {
        LIZARD_VS_SPOCK_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'rock') {
        ROCK_VS_SPOCK_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'paper') {
        PAPER_VS_SPOCK_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'scissors') {
        SCISSORS_VS_SPOCK_OUTCOME.play();
        win = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'lizard') {
        LIZARD_VS_SPOCK_OUTCOME.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else {
        DRAW_ANNOUNCE.play();
        draw = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    }
}

function highlightWinner(winOrLose, playerSelection, cpuSelection, draw) {
    let playerContenderPortrait = document.getElementById('player-contender');
    let cpuContenderPortrait = document.getElementById('cpu-contender');

    let scoreboard = document.getElementById('scoreboard');
    
    if(draw) {
        playerContenderPortrait.animate(BATTLE_PORTRAIT_SWELL_KEYFRAMES, BATTLE_PORTRAIT_SWELL_ANIMATION);
        cpuContenderPortrait.animate(BATTLE_PORTRAIT_SWELL_KEYFRAMES, BATTLE_PORTRAIT_SWELL_ANIMATION);

        CLASH_SOUND.play();
    } else if (winOrLose) {
        playerContenderPortrait.style.border = '4px solid #ceffda';
        playerContenderPortrait.style.boxShadow = '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset';

        playerContenderPortrait.animate(BATTLE_PORTRAIT_SWELL_KEYFRAMES, BATTLE_PORTRAIT_SWELL_ANIMATION);
        playerContenderPortrait.animate(WINNER_PORTRAIT_FLASH_KEYFRAMES, WINNER_PORTRAIT_FLASH_ANIMATION);
        cpuContenderPortrait.animate(LOSER_PORTRAIT_FLASH_KEYFRAMES, LOSER_PORTRAIT_FLASH_ANIMATION);

        CLASH_SOUND.play();

        ++playerWins;
    } else {
        cpuContenderPortrait.style.border = '4px solid #ceffda';
        cpuContenderPortrait.style.boxShadow = '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset';

        cpuContenderPortrait.animate(BATTLE_PORTRAIT_SWELL_KEYFRAMES, BATTLE_PORTRAIT_SWELL_ANIMATION);
        cpuContenderPortrait.animate(WINNER_PORTRAIT_FLASH_KEYFRAMES, WINNER_PORTRAIT_FLASH_ANIMATION);
        playerContenderPortrait.animate(LOSER_PORTRAIT_FLASH_KEYFRAMES, LOSER_PORTRAIT_FLASH_ANIMATION);

        CLASH_SOUND.play();

        ++cpuWins;
    }

    setTimeout(lightPlayerLamps, 2000);
    setTimeout(lightCpuLamps, 2000);

    if (playerWins <= 1 && cpuWins <= 1) {
        setTimeout(prepareForNextRound, 3000, playerSelection, cpuSelection, draw);
    } else {
        setTimeout(endGame, 3000, playerSelection, cpuSelection, draw);
    }        
}

function lightPlayerLamps() {
    let roundLampsPlayer = document.getElementsByClassName('round-lamps-player');
    let roundLightPlayer = document.getElementsByClassName('light-off-player');

    if (window.innerWidth <= 1110 && newGame === false) {
        scoreboard.scrollIntoView({behavior: 'smooth'});
    }

    if (newGame) {
        for (let i = 0; i < playerWins; i++) {
            roundLampsPlayer[i].style.border = '2px solid #444444';
            roundLampsPlayer[i].style.boxShadow = '0 0 32px #000000';
            roundLightPlayer[i].style.backgroundColor = '#0000007e';
            
            if (playerWins - 1 === 0) {
                LAMP_OFF.play();
            } else if (playerWins - 1 === 1) {
                continue;
            }
        }
        playerWins = 0;
    } else if (playerWins > 0) {
        for (let j = 0; j < playerWins; j++) {
            roundLampsPlayer[j].style.border = '3px solid #b6b4b4';
            roundLampsPlayer[j].style.boxShadow = '0 0 32px #ffffff, 0 0 32px #ffffff inset';
            roundLightPlayer[j].style.backgroundColor = '#ffffff00';

            if (playerWins - j === 1) {
                LAMP_ON.play();
            }
        }
    }   
}

function lightCpuLamps() {
    let roundLampsCpu = document.getElementsByClassName('round-lamps-cpu');
    let roundLightCpu = document.getElementsByClassName('light-off-cpu');

    if (newGame) {
        for (let i = 0; i < cpuWins; i++) {
            roundLampsCpu[i].style.border = '2px solid #444444';
            roundLampsCpu[i].style.boxShadow = '0 0 32px #000000';
            roundLightCpu[i].style.backgroundColor = '#0000007e';
        }
        cpuWins = 0;
    } else if (cpuWins > 0) {
        for (let j = 0; j < cpuWins; j++) {
            roundLampsCpu[j].style.border = '3px solid #b6b4b4';
            roundLampsCpu[j].style.boxShadow = '0 0 32px #ffffff, 0 0 32px #ffffff inset';
            roundLightCpu[j].style.backgroundColor = '#ffffff00';
            LAMP_ON.play();
        }
    }
}

function prepareForNextRound(playerSelection, cpuSelection, draw) {
    let header = document.getElementsByTagName('header');

    let contenderFrames = document.getElementsByClassName('contenders');

    let playerContenderPortrait = document.getElementById('player-contender');
    let cpuContenderPortrait = document.getElementById('cpu-contender');
    
    let playerNameplate = document.getElementById('player-nameplate');
    let cpuNameplate = document.getElementById('cpu-nameplate');

    let versusText = document.getElementById('versus-text');

    let playerPortraitFrames = document.getElementsByClassName('player-fighters');
    let playerPortraits = document.getElementsByClassName('player-portraits');
    let playerSelectionFrameIndex;
    let playerSelectionPortraitIndex;

    let cpuPortraitFrames = document.getElementsByClassName('cpu-fighters');
    let cpuPortraits = document.getElementsByClassName('cpu-portraits');
    let cpuSelectionFrameIndex;
    let cpuSelectionPortraitIndex;

    if (window.innerWidth <= 1110) {
        header[0].scrollIntoView({behavior: 'smooth'});
    }

    if (playerKO) {
        playerContenderPortrait.style.border = '3px solid #444444';
        playerContenderPortrait.style.boxShadow = '0 0 64px #000000';

        playerKO = false;
    } else if (cpuKO) {
        cpuContenderPortrait.style.border = '3px solid #444444';
        cpuContenderPortrait.style.boxShadow = '0 0 64px #000000';

        cpuKO = false;
    }

    for(let i = 0; i < playerPortraitFrames.length; i++) {
        if (playerPortraitFrames[i].getAttribute('data-type') === playerSelection) {
            playerSelectionFrameIndex = i;
            playerSelectionPortraitIndex = i;
            break;
        } else {
            continue;
        }
    }

    for(let i = 0; i < cpuPortraitFrames.length; i++) {
        if (cpuPortraitFrames[i].getAttribute('data-type') === cpuSelection) {
            cpuSelectionFrameIndex = i;
            cpuSelectionPortraitIndex = i;
            break;
        } else {
            continue;
        }
    }

    for (let frame of contenderFrames) {
        frame.style.border = '3px solid #444444';
        frame.style.boxShadow = '0 0 64px #000000';
        frame.style.background = `url(assets/images/contender-disc.jpg) no-repeat center center`;
        frame.style.backgroundSize = '100% 100%';
    }

    playerNameplate.innerText = ''; 
    cpuNameplate.innerText = '';

    versusText.style.color = '#918f8f';
    versusText.style.textShadow = '2px 2px #444444';
    
    if (mouseIn === true) {
        playerPortraitFrames[playerSelectionFrameIndex].style.border = '3px solid #ffcece';
        playerPortraitFrames[playerSelectionFrameIndex].style.boxShadow = '0 0 32px #ff002bf8';

        playerPortraits[playerSelectionPortraitIndex].style.boxShadow = '0 0 32px #ff002bf8 inset';
    } else if (mouseIn === false) {
        playerPortraitFrames[playerSelectionPortraitIndex].animate(RESTORE_SLANT_KEYFRAMES, RESTORE_SLANT_ANIMATION);
        playerPortraitFrames[playerSelectionFrameIndex].style.border = '2px solid #444444';
        playerPortraitFrames[playerSelectionFrameIndex].style.boxShadow = 'none';

        playerPortraits[playerSelectionPortraitIndex].animate(RETAIN_ANGLE_KEYFRAMES_PLAYER, RETAIN_ANGLE_ANIMATION_PLAYER);
        playerPortraits[playerSelectionPortraitIndex].style.boxShadow = 'none';

        RESET_SWISH.play();
    }

    playerPortraitFrames[playerSelectionFrameIndex].removeEventListener('mouseover', mouseHoverCheck);
    playerPortraitFrames[playerSelectionFrameIndex].removeEventListener('mouseout', selectionRetainFrameShapeOut);
    playerPortraits[playerSelectionPortraitIndex].removeEventListener('mouseover', selectionRetainImageShapeOut);

    for (let portraitFrame of playerPortraitFrames) {
        portraitFrame.addEventListener('mouseover', removeFrameSlantIn);
        portraitFrame.addEventListener('mouseout', restoreFrameSlantOut);
    }

    for (let portrait of playerPortraits) {
        portrait.addEventListener('mouseover', retainImageAngleIn);
        portrait.addEventListener('mouseout', retainImageAngleOut);
    }

    cpuPortraitFrames[cpuSelectionFrameIndex].style.border = '2px solid #444444';
    cpuPortraitFrames[cpuSelectionFrameIndex].style.boxShadow = 'none';
    cpuPortraits[cpuSelectionPortraitIndex].style.boxShadow = 'none';

    cpuPortraitFrames[cpuSelectionFrameIndex].animate(RESTORE_SLANT_KEYFRAMES_CPU, RESTORE_SLANT_ANIMATION_CPU);
    cpuPortraitFrames[cpuSelectionFrameIndex].style.transform = 'skewX(320deg)';
    cpuPortraitFrames[cpuSelectionFrameIndex].style.width = '60%';

    cpuPortraits[cpuSelectionPortraitIndex].animate(RETAIN_ANGLE_KEYFRAMES_CPU_ALT, RETAIN_ANGLE_ANIMATION_CPU_ALT);
    cpuPortraits[cpuSelectionPortraitIndex].style.transform = 'skewX(40deg) scaleX(-1)';
    cpuPortraits[cpuSelectionPortraitIndex].style.left = '-40px';

    if (newGame === false) {
        if (draw) {
            roundAudio(roundNumber);
            drawOccurredOnce = true;
        } else {
            roundAudio(++roundNumber);
        }
    }

    newGame = false;

    setTimeout(beginGame, 1400);
    setTimeout(unhideButtons, 3600);
}

function unhideButtons() {
    let playerPortraitFrames = document.getElementsByClassName('player-fighters');
    let playerPortraits = document.getElementsByClassName('player-portraits');

    let fighters = document.getElementsByClassName('character-buttons');

    for (let portrait of playerPortraits) {
        portrait.addEventListener('click', clickSwellPortrait);
    }

    for (let portraitFrame of playerPortraitFrames) {
        portraitFrame.addEventListener('click', clickChangeColor);
    }
    
    for (let i = 0; i < fighters.length; i++) { 
        fighters[i].style.display = 'initial';
    }
}

function endGame() {
    let boutContainer = document.getElementById('bout-and-scoreboard-container-outer');
    
    let playerContenderPortrait = document.getElementById('player-contender');
    let cpuContenderPortrait = document.getElementById('cpu-contender');
    
    if (playerWins === 2) {
        playerContenderPortrait.style.border = '4px solid #fff2b5';
        playerContenderPortrait.style.boxShadow = '0 0 32px #ffb13b, 0 0 32px #ffbb3b inset';
        playerContenderPortrait.animate(WINNER_PORTRAIT_GLOW_KEYFRAMES, WINNER_PORTRAIT_GLOW_ANIMATION);

        cpuContenderPortrait.style.border = '3px solid #444444';
        cpuContenderPortrait.animate(LOSER_PORTRAIT_DARKEN_KEYFRAMES, LOSER_PORTRAIT_DARKEN_ANIMATION);
        cpuContenderPortrait.style.boxShadow = '0 0 32px #000000bb, 0 0 128px #000000dd inset';
        
        cpuKO = true;

        DEFEAT_STING.play();
        setTimeout(playFinalOutcomeSound, 1000);
    } else {
        cpuContenderPortrait.style.border = '4px solid #fff2b5';
        cpuContenderPortrait.style.boxShadow = '0 0 32px #ffb13b, 0 0 32px #ffb13b inset';
        cpuContenderPortrait.animate(WINNER_PORTRAIT_GLOW_KEYFRAMES, WINNER_PORTRAIT_GLOW_ANIMATION);

        playerContenderPortrait.style.border = '3px solid #444444';
        playerContenderPortrait.animate(LOSER_PORTRAIT_DARKEN_KEYFRAMES, LOSER_PORTRAIT_DARKEN_ANIMATION);
        playerContenderPortrait.style.boxShadow = '0 0 32px #000000bb, 0 0 128px #000000dd inset';
        
        playerKO = true;

        DEFEAT_STING.play();
        setTimeout(playFinalOutcomeSound, 1000);
    }

    if (window.innerWidth <= 1110) {
        boutContainer.scrollIntoView({behavior: 'smooth'});
    }

    setTimeout(displayPlayAgain, 3000);
}

function playFinalOutcomeSound() {
    if (cpuKO) {
        VICTORIOUS.play();
    } else if (playerKO) {
        DEFEATED.play();
    }
}

function displayPlayAgain() {
    let playAgainScreen = document.getElementById('play-again-container');
    let playAgainButton = document.getElementById('play-again-button');

    playAgainButton.removeEventListener('click', animateButton);
    playAgainButton.addEventListener('click', playAgain);
    
    playAgainButton.innerHTML = `<h4 id="play-again-button-text">PLAY <br>AGAIN</h4>`;
    playAgainScreen.style.display = 'table';
}

function playAgain (event) {
    event.preventDefault();

    newGame = true;
        
    roundNumber = 1;

    drawOccurredOnce = false;

    eventListenerAttached = false;

    let draw = false;

    let playerNameplate = document.getElementById('player-nameplate');
    let cpuNameplate = document.getElementById('cpu-nameplate');

    let playerSelection = playerNameplate.innerText;
    let cpuSelection = cpuNameplate.innerText;

    let playAgainText = document.getElementById('play-again-button-text');

    this.animate(BUTTON_CLICK_KEYFRAMES, BUTTON_CLICK_ANIMATION);
    playAgainText.animate(BUTTON_TEXT_SHRINK_KEYFRAMES, BUTTON_TEXT_SHRINK_ANIMATION);

    setTimeout(clearPlayAgain, 600);

    setTimeout(lightPlayerLamps, 1000);
    setTimeout(lightCpuLamps, 1000);

    setTimeout(prepareForNextRound, 1500, playerSelection, cpuSelection, draw);
}

function clearPlayAgain() {
    let playAgainScreen = document.getElementById('play-again-container');

    playAgainScreen.style.display = 'none';
}