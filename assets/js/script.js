document.addEventListener('DOMContentLoaded', function() {
    
    let fighters = document.getElementsByTagName('button');

    for (let fighter of fighters) {
        fighter.addEventListener('click', function() {
            let selection = this.getAttribute('data-type');

            for (let i = 0; i < fighters.length; i++) {
                fighters[i].style.display = 'none';
            }

            playAudio(selection);
        })
    }
})

function playAudio(selection) {
    let rockAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/rock.mp3');
    let paperAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/paper.mp3');
    let scissorsAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/scissors.mp3');
    let lizardAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/lizard.mp3');
    let spockAnnounce = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/spock.mp3');

    let announcements = [rockAnnounce, paperAnnounce, scissorsAnnounce, lizardAnnounce, spockAnnounce];

    switch(selection) {
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