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
    let rockAnnounce = new Audio('');
    let paperAnnounce = new Audio('');
    let scissorsAnnounce = new Audio('');
    let lizardAnnounce = new Audio('');
    let spockAnnounce = new Audio('');

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