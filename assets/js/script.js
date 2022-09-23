var newGame;

var playerWins = 0;
var cpuWins = 0;
var roundNumber = 1;

var mouseIn;
var eventListenerAttached = false;
var drawOccurredOnce = false;

var playerDead = false;
var cpuDead = false;

alert('Welcome!');

document.addEventListener('DOMContentLoaded', beginGame); 

function beginGame() {    
    let laserFrame = document.getElementById('player-laser-box');
    let fighters = document.getElementsByClassName('character-buttons');
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraits = document.getElementsByClassName('player-portraits');
    let selectYourFighter = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/select-your-fighter.mp3');

    let laserSwellKeyFrames = [
        { 
            boxShadow: '0 0 32px #00ff80f8, 0 0 32px #00ff80f8 inset', 
            border: '3px solid #ceffda',
        },
        { 
            boxShadow: '0 0 64px #00ff80f8, 0 0 64px #00ff80f8 inset',
            border: '3px solid #ceffda', 
        },
        { 
            boxShadow: '0 0 32px #00ff80f8, 0 0 32px #00ff80f8 inset', 
            border: '3px solid #ceffda',
        },
    ];

    let laserSwellAnimation = { duration: 1000, direction: 'alternate', iterations: 3, };

    newGame = false;

    selectYourFighter.play();

    if (eventListenerAttached === false) {
        for (let portraitFrame of portraitFrames) {
            portraitFrame.addEventListener('mouseover', removeFrameSlantIn);
            portraitFrame.addEventListener('mouseout', restoreFrameSlantOut);
            portraitFrame.addEventListener('click', clickChangeColor);
        }

        for (let portrait of portraits) {
            portrait.addEventListener('mouseover', retainImageAngleIn);
            portrait.addEventListener('mouseout', retainImageAngleOut);
            portrait.addEventListener('click', clickSwellPortrait);
        }
    }

    laserFrame.animate(laserSwellKeyFrames, laserSwellAnimation);

    for (let fighter of fighters) {
        fighter.addEventListener('click', selectionPhase)
    } 
}

function selectionPhase(event) {
    event.preventDefault();

    let fighters = document.getElementsByClassName('character-buttons');

    let drum = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/drum-select.mp3');
    drum.volume = 1;
    drum.play();

    let playerSelection = event.currentTarget.getAttribute('data-type');

    for (let i = 0; i < fighters.length; i++) {
        fighters[i].style.display = 'none';
    }

    playSelectionAudio(playerSelection);

    let cpuSelection = cpuSelect();

    setTimeout(cpuSelectVisual, 2500, cpuSelection);

    setTimeout(playSelectionAudio, 2500, cpuSelection);
    setTimeout(playDrum, 2500, drum); 

    if (roundNumber === 1 && drawOccurredOnce === false) {
        setTimeout(roundAudio, 4000, roundNumber);
        setTimeout(setContenders, 5500, playerSelection, cpuSelection);
    } else {
        setTimeout(setContenders, 4000, playerSelection, cpuSelection); 
    }   
} 

function removeFrameSlantIn(event) {  
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraitFrame = event.currentTarget;

    let removeSlantKeyframes = [
        { 
            transform: 'skewX(40deg)',
            width: '60%',
        },
        {
            transform: 'skewX(0deg)',
            width: '90%',
        },
    ];

    let removeSlantAnimation = { duration: 150, fill: 'forwards', direction: 'normal', };

    portraitFrame.animate(removeSlantKeyframes, removeSlantAnimation);
    portraitFrame.style.border = '3px solid #ffcece';
    portraitFrame.style.boxShadow = '0 0 32px #ff002bf8';

    eventListenerAttached = true;
}

function restoreFrameSlantOut(event) {
    event.preventDefault();

    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraitFrame = event.currentTarget;

    let restoreSlantKeyframes = [
        { 
            transform: 'skewX(0deg)',
            width: '90%',
        },
        {
            transform: 'skewX(40deg)',
            width: '60%',
        },
    ];

    let restoreSlantAnimation = { duration: 150, fill: 'forwards', direction: 'normal', };

    portraitFrame.animate(restoreSlantKeyframes, restoreSlantAnimation);
    portraitFrame.style.border = '2px solid #444444';
    portraitFrame.style.boxShadow = 'none';
}

function clickChangeColor(event) {
    event.preventDefault();

    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraitFrame = event.currentTarget;

    for (let frame of portraitFrames) {
        if (frame !== portraitFrame) {
            frame.removeEventListener('click', clickChangeColor);
        } else {
            continue;
        }
    }

    portraitFrame.removeEventListener('mouseover', removeFrameSlantIn);
    portraitFrame.removeEventListener('mouseout', restoreFrameSlantOut);  
    portraitFrame.addEventListener('mouseout', selectionRetainFrameShapeOut);
    portraitFrame.addEventListener('mouseover', mouseHoverCheck);
    portraitFrame.style.border = '3px solid #ceffda';
    portraitFrame.style.boxShadow = '0 0 32px #00ff80f8';
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

    let portraits = document.getElementsByClassName('player-portraits');
    let portrait = event.currentTarget;

    let retainAngleKeyframes = [
        { 
            transform: 'skewX(320deg)',
            right: '-40px',
        },
        {
            transform: 'skewX(360deg)',
            right: '-20px',
        },
    ];

    let retainAngleAnimation = { duration: 150, fill: 'forwards', direction: 'normal', };
    
    portrait.animate(retainAngleKeyframes, retainAngleAnimation);
    portrait.style.boxShadow = '0 0 32px #ff002bf8 inset';
}

function retainImageAngleOut(event) {
    event.preventDefault();

    let portraits = document.getElementsByClassName('player-portraits');
    let portrait = event.currentTarget;

    let retainAngleKeyframes = [
        { 
            transform: 'skewX(360deg)',
            right: '-20px',
        },
        {
            transform: 'skewX(320deg)',
            right: '-40px',
        },
    ];

    let retainAngleAnimation = { duration: 150, fill: 'forwards', direction: 'normal', };
    
    portrait.animate(retainAngleKeyframes, retainAngleAnimation);
    portrait.style.boxShadow = 'none';
}

function clickSwellPortrait(event) {
    event.preventDefault();
    
    let portraits = document.getElementsByClassName('player-portraits');
    let portrait = event.currentTarget;

    let portraitSwellKeyframes = [
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' },
    ];
    let portraitSwellAnimation = { duration: 700, fill: 'forwards', };

    for (let image of portraits) {
        if (image !== portrait) {
            image.removeEventListener('click', clickSwellPortrait);
        } else {
            continue;
        }
    }

    portrait.removeEventListener('mouseover', retainImageAngleIn);
    portrait.removeEventListener('mouseout', retainImageAngleOut);
    portrait.addEventListener('mouseout', selectionRetainImageShapeOut);
    portrait.style.boxShadow = '0 0 32px #00ff80f8 inset';
    portrait.animate(portraitSwellKeyframes, portraitSwellAnimation);
}

function selectionRetainImageShapeOut(event) {
    event.preventDefault();
    
    let portrait = event.currentTarget;

    portrait.style.transform = 'skewX(360deg)';
    portrait.style.right = '-20px';
}



function playSelectionAudio(playerSelection) {
    let rockAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/rock.mp3');
    let paperAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/paper.mp3');
    let scissorsAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/scissors.mp3');
    let lizardAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/lizard.mp3');
    let spockAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/spock.mp3');

    let announcements = [rockAnnounce, paperAnnounce, scissorsAnnounce, lizardAnnounce, spockAnnounce];

    switch(playerSelection) {
        case 'rock':
            announcements[0].play();
            break;
        case 'paper':
            announcements[1].play();
            break;
        case 'scissors':
            announcements[2].play();
            break;
        case 'lizard':
            announcements[3].play();
            break;
        case 'spock':
            announcements[4].play();
            break;
    }
}

function cpuSelect() {
    let cpuFighters = document.getElementsByClassName('cpu-portraits');
    
    let fighterNumber = Math.floor(Math.random() * 5);

    let cpuSelection = cpuFighters[fighterNumber];

    return cpuSelection.getAttribute('id');
}

function playDrum(drum) {
    drum.volume = 1;
    drum.play();
}

function roundAudio(roundNumber) {
    let roundOne = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/round-one.mp3');
    let roundTwo = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/round-two.mp3');
    let finalRound = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/final-round.mp3');

    switch(roundNumber) {
        case 1:
            roundOne.play();
            break;
        case 2:
            roundTwo.play();
            break;
        case 3:
            finalRound.play();
            break;
    }
}

function cpuSelectVisual(cpuSelection) {
    let cpuPortraitFrames = document.getElementsByClassName('cpu-fighters');
    let cpuPortraits = document.getElementsByClassName('cpu-portraits');

    let removeSlantKeyframes = [
        { 
            transform: 'skewX(320deg)',
            width: '60%',
        },
        {
            transform: 'skewX(360deg)',
            width: '90%',
        },
    ];
    let removeSlantAnimation = { duration: 150, fill: 'forwards', direction: 'normal', };

    let retainAngleKeyframes = [
        { 
            transform: 'skewX(40deg)',
            left: '-40px',
        },
        {
            transform: 'skewX(0deg)',
            left: '-20px',
        },
    ];
    let retainAngleAnimation = { duration: 150, fill: 'forwards', direction: 'normal', };

    let portraitSwellKeyframes = [
        { transform: 'scaleX(-1) scaleY(1)' },
        { transform: 'scaleX(-1.1) scaleY(1.1)' },
        { transform: 'scaleX(-1) scaleY(1)' },
    ];
    let portraitSwellAnimation = { duration: 700, fill: 'forwards', };

    switch(cpuSelection) {
        case 'rock':
            cpuPortraitFrames[0].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[0].style.border = '3px solid #ceffda';
            cpuPortraitFrames[0].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[0].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[0].animate(portraitSwellKeyframes, portraitSwellAnimation);
            cpuPortraits[0].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'paper':
            cpuPortraitFrames[1].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[1].style.border = '3px solid #ceffda';
            cpuPortraitFrames[1].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[1].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[1].animate(portraitSwellKeyframes, portraitSwellAnimation);
            cpuPortraits[1].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'scissors':
            cpuPortraitFrames[2].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[2].style.border = '3px solid #ceffda';
            cpuPortraitFrames[2].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[2].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[2].animate(portraitSwellKeyframes, portraitSwellAnimation);
            cpuPortraits[2].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'lizard':
            cpuPortraitFrames[3].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[3].style.border = '3px solid #ceffda';
            cpuPortraitFrames[3].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[3].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[3].animate(portraitSwellKeyframes, portraitSwellAnimation);
            cpuPortraits[3].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'spock':
            cpuPortraitFrames[4].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[4].style.border = '3px solid #ceffda';
            cpuPortraitFrames[4].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[4].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[4].animate(portraitSwellKeyframes, portraitSwellAnimation);
            cpuPortraits[4].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
    }
}

function setContenders(playerSelection, cpuSelection) {
    let sfx = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/electric-shock.mp3');
    sfx.volume = 0.5;
    
    let contenderFrames = document.getElementsByClassName('contenders');

    let playerContenderPortrait = document.getElementById('player-contender');
    let playerNameplate = document.getElementById('player-nameplate');

    let versusText = document.getElementById('versus-text');

    let cpuContenderPortrait = document.getElementById('cpu-contender');
    let cpuNameplate = document.getElementById('cpu-nameplate');

    let boutContainer = document.getElementById('bout-and-scoreboard-container-outer');

    boutContainer.scrollIntoView({behavior: "smooth"});

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

    sfx.play();

    setTimeout(declareVictor, 1000, playerSelection, cpuSelection);
}

function declareVictor(playerSelection, cpuSelection) {
    let rockVsPaper = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/paper-covers-rock.mp3');
    let rockVsScissors = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/rock-smashes-scissors.mp3');
    let rockVsLizard = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/rock-squashes-lizard.mp3');
    let rockVsSpock = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/spock-vaporises-rock.mp3');

    let paperVsScissors = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/scissors-cuts-paper.mp3');
    let paperVsLizard = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/lizard-eats-paper.mp3');
    let paperVsSpock = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/paper-suffocates-spock.mp3');

    let scissorsVsLizard = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/scissors-decapitates-lizard.mp3');
    let scissorsVsSpock = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/spock-snaps-scissors.mp3');

    let lizardVsSpock = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/lizard-poisons-spock.mp3');

    let drawAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/draw.mp3');

    let win;
    let draw = false;

    if (playerSelection === 'rock' && cpuSelection === 'paper') {
        rockVsPaper.play();
        win = false;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'rock' && cpuSelection === 'scissors') {
        rockVsScissors.play();
        win = true;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'rock' && cpuSelection === 'lizard') {
        rockVsLizard.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'rock' && cpuSelection === 'spock') {
        rockVsSpock.play();
        win = false;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'rock') {
        rockVsPaper.play();
        win = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'scissors') {
        paperVsScissors.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'lizard') {
        paperVsLizard.play();
        win = false;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'paper' && cpuSelection === 'spock') {
        paperVsSpock.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'rock') {
        rockVsScissors.play();
        win = false;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'paper') {
        paperVsScissors.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'lizard') {
        scissorsVsLizard.play();
        win = true;
        setTimeout(highlightWinner, 2700, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'scissors' && cpuSelection === 'spock') {
        scissorsVsSpock.play();
        win = false;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'rock') {
        rockVsLizard.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'paper') {
        paperVsLizard.play();
        win = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'scissors') {
        scissorsVsLizard.play();
        win = false;
        setTimeout(highlightWinner, 2700, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'lizard' && cpuSelection === 'spock') {
        lizardVsSpock.play();
        win = true;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'rock') {
        rockVsSpock.play();
        win = true;
        setTimeout(highlightWinner, 2500, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'paper') {
        paperVsSpock.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'scissors') {
        scissorsVsSpock.play();
        win = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    } else if (playerSelection === 'spock' && cpuSelection === 'lizard') {
        lizardVsSpock.play();
        win = false;
        setTimeout(highlightWinner, 2300, win, playerSelection, cpuSelection, draw);
    } else {
        drawAnnounce.play();
        draw = true;
        setTimeout(highlightWinner, 2200, win, playerSelection, cpuSelection, draw);
    }
}

function highlightWinner(winOrLose, playerSelection, cpuSelection, draw) {
    let playerContenderPortrait = document.getElementById('player-contender');
    let cpuContenderPortrait = document.getElementById('cpu-contender');
    let winnerSound = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/electric-shock-short.mp3');

    let portraitSwellKeyframes = [
        { backgroundSize: '100% 100%' },
        { backgroundSize: '120% 120%' },
        { backgroundSize: '100% 100%' },
    ];
    let portraitSwellAnimation = { duration: 500, direction: 'alternate', };

    let portraitWinnerFlashKeyframes = [
        { boxShadow: '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset' },
        { boxShadow: '0 0 128px #00ff80f8, 0 0 32px #00ff80f8 inset' },
        { boxShadow: '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset' },
    ];
    let portraitWinnerFlashAnimation = { duration: 500, direction: 'alternate', };

    let portraitLoserFlashKeyframes = [
        { boxShadow: '0 0 64px #ff002bf8, 0 0 32px #ff002bf8 inset' },
        { boxShadow: '0 0 64px #ff002bf8, 0 0 128px #ff002bf8 inset' },
        { boxShadow: '0 0 64px #ff002bf8, 0 0 32px #ff002bf8 inset' },
    ];
    let portraitLoserFlashAnimation = { duration: 500, direction: 'alternate', };
    
    if(draw) {
        playerContenderPortrait.animate(portraitSwellKeyframes, portraitSwellAnimation);
        cpuContenderPortrait.animate(portraitSwellKeyframes, portraitSwellAnimation);

        winnerSound.play();
    } else if (winOrLose) {
        playerContenderPortrait.style.border = '4px solid #ceffda';
        playerContenderPortrait.style.boxShadow = '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset';

        playerContenderPortrait.animate(portraitSwellKeyframes, portraitSwellAnimation);
        playerContenderPortrait.animate(portraitWinnerFlashKeyframes, portraitWinnerFlashAnimation);
        cpuContenderPortrait.animate(portraitLoserFlashKeyframes, portraitLoserFlashAnimation);

        winnerSound.play();

        ++playerWins;
    } else {
        cpuContenderPortrait.style.border = '4px solid #ceffda';
        cpuContenderPortrait.style.boxShadow = '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset';

        cpuContenderPortrait.animate(portraitSwellKeyframes, portraitSwellAnimation);
        cpuContenderPortrait.animate(portraitWinnerFlashKeyframes, portraitWinnerFlashAnimation);
        playerContenderPortrait.animate(portraitLoserFlashKeyframes, portraitLoserFlashAnimation);

        winnerSound.play();

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
    let roundLampsPlayer = document.getElementsByClassName('round-bulbs-player');
    let roundLightPlayer = document.getElementsByClassName('light-off-player');

    if (newGame) {
        for (let i = 0; i < playerWins; i++) {
            roundLampsPlayer[i].style.border = '2px solid #444444';
            roundLampsPlayer[i].style.boxShadow = '0 0 32px #000000';
            roundLightPlayer[i].style.backgroundColor = '#0000007e';
        }
        playerWins = 0;
    } else if (playerWins > 0) {
        for (let j = 0; j < playerWins; j++) {
            roundLampsPlayer[j].style.border = '3px solid #b6b4b4';
            roundLampsPlayer[j].style.boxShadow = '0 0 32px #ffffff, 0 0 32px #ffffff inset';
            roundLightPlayer[j].style.backgroundColor = '#ffffff00';
        }
    }   
}

function lightCpuLamps() {
    let roundLampsCpu = document.getElementsByClassName('round-bulbs-cpu');
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
        }
    }
}

function prepareForNextRound(playerSelection, cpuSelection, draw) {
    
    let fighters = document.getElementsByTagName('button');

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

    let restoreSlantKeyframesCpu = [
        { 
            transform: 'skewX(360deg)',
            width: '90%',
        },
        {
            transform: 'skewX(320deg)',
            width: '60%',
        },
    ];
    let restoreSlantAnimationCpu = { duration: 150, fill: 'forwards', direction: 'normal', };

    let retainAngleKeyframesCpu = [
        { 
            transform: 'skewX(0deg) scaleX(-1)',
            left: '-20px',
        },
        {
            transform: 'skewX(40deg) scaleX(-1)',
            left: '-40px',
        },
    ];
    let retainAngleAnimationCpu = { duration: 150, fill: 'forwards', direction: 'normal', };

    
    let restoreSlantKeyframesPlayer = [
        { 
            transform: 'skewX(0deg)',
            width: '90%',
        },
        {
            transform: 'skewX(40deg)',
            width: '60%',
        },
    ];
    let restoreSlantAnimationPlayer = { duration: 150, fill: 'forwards', direction: 'normal', };

    let retainAngleKeyframesPlayer = [
        { 
            transform: 'skewX(360deg)',
            right: '-20px',
        },
        {
            transform: 'skewX(320deg)',
            right: '-40px',
        },
    ];
    let retainAngleAnimationPlayer = { duration: 150, fill: 'forwards', direction: 'normal', };

    if (playerDead) {
        playerContenderPortrait.style.border = '3px solid #444444';
        playerContenderPortrait.style.boxShadow = '0 0 64px #000000';

        playerDead = false;
    } else if (cpuDead) {
        cpuContenderPortrait.style.border = '3px solid #444444';
        cpuContenderPortrait.style.boxShadow = '0 0 64px #000000';

        cpuDead = false;
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
    
    for (let i = 0; i < fighters.length; i++) { 
        fighters[i].style.display = 'initial';
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

    if(mouseIn) {
        playerPortraitFrames[playerSelectionFrameIndex].style.border = '3px solid #ffcece';
        playerPortraitFrames[playerSelectionFrameIndex].style.boxShadow = '0 0 32px #ff002bf8';

        playerPortraits[playerSelectionPortraitIndex].style.boxShadow = '0 0 32px #ff002bf8 inset';
    } else {
        playerPortraitFrames[playerSelectionPortraitIndex].animate(restoreSlantKeyframesPlayer, restoreSlantAnimationPlayer);
        playerPortraitFrames[playerSelectionFrameIndex].style.border = '2px solid #444444';
        playerPortraitFrames[playerSelectionFrameIndex].style.boxShadow = 'none';

        playerPortraits[playerSelectionPortraitIndex].animate(retainAngleKeyframesPlayer, retainAngleAnimationPlayer);
        playerPortraits[playerSelectionPortraitIndex].style.boxShadow = 'none';
    }

    playerPortraitFrames[playerSelectionFrameIndex].removeEventListener('mouseover', mouseHoverCheck);
    playerPortraitFrames[playerSelectionFrameIndex].removeEventListener('mouseout', selectionRetainFrameShapeOut);
    playerPortraits[playerSelectionPortraitIndex].removeEventListener('mouseover', selectionRetainImageShapeOut);

    for (let portraitFrame of playerPortraitFrames) {
        portraitFrame.addEventListener('mouseover', removeFrameSlantIn);
        portraitFrame.addEventListener('mouseout', restoreFrameSlantOut);
        portraitFrame.addEventListener('click', clickChangeColor);
    }

    for (let portrait of playerPortraits) {
        portrait.addEventListener('mouseover', retainImageAngleIn);
        portrait.addEventListener('mouseout', retainImageAngleOut);
        portrait.addEventListener('click', clickSwellPortrait);
    }

    cpuPortraitFrames[cpuSelectionFrameIndex].style.border = '2px solid #444444';
    cpuPortraitFrames[cpuSelectionFrameIndex].style.boxShadow = 'none';
    cpuPortraits[cpuSelectionPortraitIndex].style.boxShadow = 'none';
    cpuPortraitFrames[cpuSelectionFrameIndex].animate(restoreSlantKeyframesCpu, restoreSlantAnimationCpu);
    cpuPortraits[cpuSelectionPortraitIndex].animate(retainAngleKeyframesCpu, retainAngleAnimationCpu);

    if (newGame === false) {
        if (draw) {
            roundAudio(roundNumber);
            drawOccurredOnce = true;
        } else {
            roundAudio(++roundNumber);
        }
    }

    newGame = false;
    
    setTimeout(beginGame, 2000);
}

function endGame(playerSelection, cpuSelection, draw) {
    let playerContenderPortrait = document.getElementById('player-contender');
    let cpuContenderPortrait = document.getElementById('cpu-contender');

    let playerBackgroundProperty = playerContenderPortrait.style.background;
    let cpuBackgroundProperty = cpuContenderPortrait.style.background;

    let victorious = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/victorious.mp3');
    let defeated = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/defeated.mp3');
    
    let contenderPortraitGlowKeyframes = [
        { boxShadow: '0 0 32px #ffdb3b, 0 0 32px #ffdb3b inset' },
        { boxShadow: '0 0 64px #ffdb3b, 0 0 64px #ffdb3b inset' },
    ];
    let contenderPortraitGlowAnimation = { duration: 500, direction: 'alternate', iterations: 10 };

    let loserPortraitDarkenKeyFrames = [
        { boxShadow: '0 0 32px #000000bb, 0 0 32px #000000dd inset' },
        { boxShadow: '0 0 32px #000000bb, 0 0 128px #000000dd inset' },
    ];

    let loserPortraitDarkenAnimation = { duration: 1000, direction: 'normal' };
    
    if (playerWins === 2) {
        playerContenderPortrait.style.border = '4px solid #fff1b5';
        playerContenderPortrait.style.boxShadow = '0 0 32px #ffdb3b, 0 0 32px #ffdb3b inset';
        playerContenderPortrait.animate(contenderPortraitGlowKeyframes, contenderPortraitGlowAnimation);

        cpuContenderPortrait.style.border = '3px solid #444444';
        cpuContenderPortrait.animate(loserPortraitDarkenKeyFrames, loserPortraitDarkenAnimation);
        cpuContenderPortrait.style.boxShadow = '0 0 32px #000000bb, 0 0 128px #000000dd inset';
        
        cpuDead = true;

        victorious.play();
    } else {
        cpuContenderPortrait.style.border = '4px solid #fff1b5';
        cpuContenderPortrait.style.boxShadow = '0 0 32px #ffdb3b, 0 0 32px #ffdb3b inset';
        cpuContenderPortrait.animate(contenderPortraitGlowKeyframes, contenderPortraitGlowAnimation);

        playerContenderPortrait.style.border = '3px solid #444444';
        playerContenderPortrait.animate(loserPortraitDarkenKeyFrames, loserPortraitDarkenAnimation);
        playerContenderPortrait.style.boxShadow = '0 0 32px #000000bb, 0 0 128px #000000dd inset';
        
        playerDead = true;

        defeated.play();
    }

    setTimeout(displayPlayAgain, 4000, playerSelection, cpuSelection, draw);
}

function displayPlayAgain(playerSelection, cpuSelection, draw) {
    let playAgainScreen = document.getElementById('play-again-container');
    let playAgainButton = document.getElementById('play-again-button');

    playAgainButton.addEventListener('click', playAgain);
    
    playAgainScreen.style.display = 'table';
}

function playAgain (event) {
    event.preventDefault();

    newGame = true;
        
    roundNumber = 1;

    drawOccurredOnce = false;

    let draw = false;
        
    let buttonClickKeyframes = [
        { 
            width: '49%',
            height: '19%',
        },
        { 
            width: '50%',
            height: '20%',
        },
    ];

    let buttonClickAnimation = { duration: 100, direction: 'alternate' };

    let playerNameplate = document.getElementById('player-nameplate');
    let cpuNameplate = document.getElementById('cpu-nameplate');

    let playerSelection = playerNameplate.innerText;
    let cpuSelection = cpuNameplate.innerText;

    this.animate(buttonClickKeyframes, buttonClickAnimation);

    setTimeout(clearPlayAgain, 1000);

    setTimeout(lightPlayerLamps, 1500);
    setTimeout(lightCpuLamps, 1500);

    setTimeout(prepareForNextRound, 2000, playerSelection, cpuSelection, draw);
}

function clearPlayAgain() {
    let playAgainScreen = document.getElementById('play-again-container');

    playAgainScreen.style.display = 'none';
}