document.addEventListener('DOMContentLoaded', function() {
    let fighters = document.getElementsByTagName('button');
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraits = document.getElementsByClassName('player-portraits');

    for (let portraitFrame of portraitFrames) {
        portraitFrame.addEventListener('click', changeColor);
        portraitFrame.addEventListener('mouseout', retainFrameShape);
    }

    for (let portrait of portraits) {
        portrait.addEventListener('click', animatePortrait);
        portrait.addEventListener('mouseout', retainImageShape);
    }

    for (let fighter of fighters) {
        fighter.addEventListener('click', function() {
            let bgm = document.getElementById('bgm');
            bgm.volume = 0.6;
            bgm.play();
            
            let playerSelection = this.getAttribute('data-type');

            for (let i = 0; i < fighters.length; i++) {
                fighters[i].style.display = 'none';
            }

            playAudio(playerSelection);
            let cpuSelection = cpuSelect();
        })
    }
})

function changeColor(event) {
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraitFrame = event.currentTarget;

    for (let frame of portraitFrames) {
        if (frame !== portraitFrame) {
            frame.removeEventListener('click', changeColor);
        } else {
            continue;
        }
    }

    portraitFrame.style.border = '3px solid #d8ffce';
    portraitFrame.style.boxShadow = '0 0 32px #00ff40f8';
}

function retainFrameShape(event) {
    let portraitFrames = document.getElementsByClassName('player-fighters');
    let portraitFrame = event.currentTarget;

    for (let frame of portraitFrames) {
        if (frame !== portraitFrame) {
            frame.removeEventListener('mouseout', retainFrameShape);
        } else {
            continue;
        }
    }

    portraitFrame.style.transform = 'skewX(0deg)';
    portraitFrame.style.width = '90%';
}

function animatePortrait(event) {
    let portraits = document.getElementsByClassName('player-portraits');
    let portrait = event.currentTarget;

    let portraitSwelling = [
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' },
    ];
    let portraitSwellTime = {duration: 700, fill: 'forwards'};

    for (let image of portraits) {
        if (image !== portrait) {
            image.removeEventListener('click', animatePortrait);
        } else {
            continue;
        }
    }

    portrait.style.boxShadow = '0 0 32px #00ff40f8 inset';
    portrait.animate(portraitSwelling, portraitSwellTime);
}

function retainImageShape(event) {
    let portraits = document.getElementsByClassName('player-portraits');
    let portrait = event.currentTarget;


    for (let image of portraits) {
        if (image !== portrait) {
            image.removeEventListener('mouseout', retainImageShape);
        } else {
            continue;
        }
    }

    portrait.style.transform = 'skewX(360deg)';
    portrait.style.right = '-20px';
}

function playAudio(playerSelection) {
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
    
    let fighterNumber = Math.floor(Math.random() * 4);

    let cpuSelection = cpuFighters[fighterNumber];

    return cpuSelection.getAttribute('class');
}