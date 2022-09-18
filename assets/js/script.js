document.addEventListener('DOMContentLoaded', function() {
    let fighters = document.getElementsByTagName('button');
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraits = document.getElementsByClassName('player-portraits');

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

    for (let fighter of fighters) {
        fighter.addEventListener('click', function() {
            // let bgm = document.getElementById('bgm');
            let drum = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/drum-select.mp3');
            drum.volume = 1;
            drum.play();
            
            let playerSelection = this.getAttribute('data-type');

            for (let i = 0; i < fighters.length; i++) {
                fighters[i].style.display = 'none';
            }

            playSelectionAudio(playerSelection);

            let cpuSelection = cpuSelect();

            setTimeout(cpuSelectVisual, 3000, cpuSelection);
            setTimeout(playSelectionAudio, 3000, cpuSelection);
            setTimeout(playDrum, 3000, drum); 

            setTimeout(setContenders, 6000, playerSelection, cpuSelection);
        })
    }
})



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
}

function restoreFrameSlantOut(event) {
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
    portraitFrame.style.border = '3px solid #ceffda';
    portraitFrame.style.boxShadow = '0 0 32px #00ff80f8';
}

function selectionRetainFrameShapeOut(event) {
    let portraitFrame = event.currentTarget;

    portraitFrame.style.transform = 'skewX(0deg)';
    portraitFrame.style.width = '90%';
}




function retainImageAngleIn(event) {
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
            cpuPortraits[0].animate(portraitSwellKeyframes, portraitSwellAnimation)
            cpuPortraits[0].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'paper':
            cpuPortraitFrames[1].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[1].style.border = '3px solid #ceffda';
            cpuPortraitFrames[1].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[1].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[1].animate(portraitSwellKeyframes, portraitSwellAnimation)
            cpuPortraits[1].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'scissors':
            cpuPortraitFrames[2].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[2].style.border = '3px solid #ceffda';
            cpuPortraitFrames[2].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[2].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[2].animate(portraitSwellKeyframes, portraitSwellAnimation)
            cpuPortraits[2].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'lizard':
            cpuPortraitFrames[3].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[3].style.border = '3px solid #ceffda';
            cpuPortraitFrames[3].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[3].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[3].animate(portraitSwellKeyframes, portraitSwellAnimation)
            cpuPortraits[3].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
        case 'spock':
            cpuPortraitFrames[4].animate(removeSlantKeyframes, removeSlantAnimation);
            cpuPortraitFrames[4].style.border = '3px solid #ceffda';
            cpuPortraitFrames[4].style.boxShadow = '0 0 32px #00ff80f8';

            cpuPortraits[4].animate(retainAngleKeyframes, retainAngleAnimation);
            cpuPortraits[4].animate(portraitSwellKeyframes, portraitSwellAnimation)
            cpuPortraits[4].style.boxShadow = '0 0 32px #00ff80f8 inset';

            break;
    }
}

function setContenders(playerSelection, cpuSelection) {
    let sfx = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/electric-shock.mp3');
    sfx.volume = 1;
    
    let contenderFrames = document.getElementsByClassName('contenders');
    let playerContenderPortrait = document.getElementById('player-contender');
    let playerNameplate = document.getElementById('player-nameplate');

    let cpuContenderPortrait = document.getElementById('cpu-contender');
    let cpuNameplate = document.getElementById('cpu-nameplate');

    for (let frame of contenderFrames) {
        frame.style.border = '3px solid #ffcece';
        frame.style.boxShadow = '0 0 64px #ff002bf8, 0 0 32px #ff002bf8 inset';
    }

    playerContenderPortrait.style.background = `url(assets/images/${playerSelection}-square.jpg) no-repeat center center`;
    playerContenderPortrait.style.backgroundSize = '100% 100%';
    playerNameplate.innerHTML = playerSelection;

    cpuContenderPortrait.style.background = `url(assets/images/${cpuSelection}-square.jpg) no-repeat center center`;
    cpuContenderPortrait.style.backgroundSize = '100% 100%';
    cpuContenderPortrait.style.transform = 'scaleX(-1)';
    cpuNameplate.innerHTML = cpuSelection;

    sfx.play();
}
