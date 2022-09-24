// ANIMATIONS

const BUTTON_CLICK_KEYFRAMES = [
    { 
        width: '49%',
        height: '19%',
    },
    { 
        width: '50%',
        height: '20%',
    },
];

const BUTTON_CLICK_ANIMATION = { duration: 100, direction: 'alternate', };

const BUTTON_TEXT_SHRINK_KEYFRAMES = [
    {
        fontSize: '2rem',
    },
    {
        fontSize: '1.8rem',
    },
]

const BUTTON_TEXT_SHRINK_ANIMATION = { duration: 100, direction: 'alternate', };

const LASER_SWELL_KEYFRAMES = [
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

const LASER_SWELL_ANIMATION = { duration: 1000, direction: 'alternate', iterations: 3, };

const REMOVE_SLANT_KEYFRAMES = [
    { 
        transform: 'skewX(40deg)',
        width: '60%',
    },
    {
        transform: 'skewX(0deg)',
        width: '90%',
    },
];

const REMOVE_SLANT_ANIMATION = { duration: 150, fill: 'forwards', direction: 'normal', };

const REMOVE_SLANT_KEYFRAMES_STATIC = [
    { 
        transform: 'skewX(0deg)',
        width: '90%',
    },
];

const REMOVE_SLANT_ANIMATION_STATIC = { duration: 0, fill: 'forwards', direction: 'normal', };

const RESTORE_SLANT_KEYFRAMES = [
    { 
        transform: 'skewX(0deg)',
        width: '90%',
    },
    {
        transform: 'skewX(40deg)',
        width: '60%',
    },
];

const RESTORE_SLANT_ANIMATION = { duration: 150, fill: 'forwards', direction: 'normal', };

const RETAIN_ANGLE_KEYFRAMES = [
    { 
        transform: 'skewX(320deg)',
        right: '-40px',
    },
    {
        transform: 'skewX(360deg)',
        right: '-20px',
    },
];

const RETAIN_ANGLE_ANIMATION = { duration: 150, fill: 'forwards', direction: 'normal', };

const RETAIN_ANGLE_KEYFRAMES_STATIC = [
    { 
        transform: 'skewX(360deg)',
        right: '-20px',
    },
];

const RETAIN_ANGLE_ANIMATION_STATIC = { duration: 0, fill: 'forwards', direction: 'normal', };

const RETAIN_ANGLE_KEYFRAMES_OUT = [
    { 
        transform: 'skewX(360deg)',
        right: '-20px',
    },
    {
        transform: 'skewX(320deg)',
        right: '-40px',
    },
];

const RETAIN_ANGLE_ANIMATION_OUT = { duration: 150, fill: 'forwards', direction: 'normal', };

const PORTRAIT_SWELL_KEYFRAMES = [
    { transform: 'scale(1)' },
    { transform: 'scale(1.1)' },
    { transform: 'scale(1)' },
];

const PORTRAIT_SWELL_ANIMATION = { duration: 700, direction: 'normal', };

const REMOVE_SLANT_KEYFRAMES_CPU = [
    { 
        transform: 'skewX(320deg)',
        width: '60%',
    },
    {
        transform: 'skewX(360deg)',
        width: '90%',
    },
];

const REMOVE_SLANT_ANIMATION_CPU = { duration: 150, direction: 'normal', };

const RETAIN_ANGLE_KEYFRAMES_CPU = [
    { 
        transform: 'skewX(40deg)',
        left: '-40px',
    },
    {
        transform: 'skewX(0deg)',
        left: '-20px',
    },
];

const RETAIN_ANGLE_ANIMATION_CPU = { duration: 150, direction: 'normal', };

const PORTRAIT_SWELL_KEYFRAMES_CPU = [
    { transform: 'scaleX(-1) scaleY(1)' },
    { transform: 'scaleX(-1.1) scaleY(1.1)' },
    { transform: 'scaleX(-1) scaleY(1)' },
];

const PORTRAIT_SWELL_ANIMATION_CPU = { duration: 700, direction: 'normal', };

const BATTLE_PORTRAIT_SWELL_KEYFRAMES = [
    { backgroundSize: '100% 100%' },
    { backgroundSize: '120% 120%' },
    { backgroundSize: '100% 100%' },
];

const BATTLE_PORTRAIT_SWELL_ANIMATION = { duration: 500, direction: 'alternate', };

const WINNER_PORTRAIT_FLASH_KEYFRAMES = [
    { boxShadow: '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset' },
    { boxShadow: '0 0 128px #00ff80f8, 0 0 32px #00ff80f8 inset' },
    { boxShadow: '0 0 64px #00ff80f8, 0 0 32px #00ff80f8 inset' },
];

const WINNER_PORTRAIT_FLASH_ANIMATION = { duration: 500, direction: 'alternate', };

const LOSER_PORTRAIT_FLASH_KEYFRAMES = [
    { boxShadow: '0 0 64px #ff002bf8, 0 0 32px #ff002bf8 inset' },
    { boxShadow: '0 0 64px #ff002bf8, 0 0 128px #ff002bf8 inset' },
    { boxShadow: '0 0 64px #ff002bf8, 0 0 32px #ff002bf8 inset' },
];

const LOSER_PORTRAIT_FLASH_ANIMATION = { duration: 500, direction: 'alternate', }; 

const RESTORE_SLANT_KEYFRAMES_CPU = [
    { 
        transform: 'skewX(360deg)',
        width: '90%',
    },
    {
        transform: 'skewX(320deg)',
        width: '60%',
    },
];

const RESTORE_SLANT_ANIMATION_CPU = { duration: 150, direction: 'normal', };

// THIS ONE MAYBE NOT NECESSARY? HAS SWITCHED VALUES COMPARED TO RETAIN_ANGLE_KEYFRAMES_CPU, AND ALSO HAS SCALEX VALUES FOR TRANSFORM.
const RETAIN_ANGLE_KEYFRAMES_CPU_ALT = [
    { 
        transform: 'skewX(0deg) scaleX(-1)',
        left: '-20px',
    },
    {
        transform: 'skewX(40deg) scaleX(-1)',
        left: '-40px',
    },
];

const RETAIN_ANGLE_ANIMATION_CPU_ALT = { duration: 150, direction: 'normal', };
// END OF POSSIBLE DUPLICATE.


// NOT SURE WHY THE VALUES FOR RIGHT ARE SWITCHED COMPARED TO RETAIN_ANGLE_KEYFRAMES.
const RETAIN_ANGLE_KEYFRAMES_PLAYER = [
    { 
        transform: 'skewX(360deg)',
        right: '-20px',
    },
    {
        transform: 'skewX(320deg)',
        right: '-40px',
    },
];
// END OF POSSIBLE ERROR.

const RETAIN_ANGLE_ANIMATION_PLAYER = { duration: 150, fill: 'forwards', direction: 'normal', };

const WINNER_PORTRAIT_GLOW_KEYFRAMES = [
    { boxShadow: '0 0 32px #ffdb3b, 0 0 32px #ffbb3b inset' },
    { boxShadow: '0 0 64px #ffdb3b, 0 0 64px #ffbb3b inset' },
];

const WINNER_PORTRAIT_GLOW_ANIMATION = { duration: 500, direction: 'alternate', iterations: 10 };

const LOSER_PORTRAIT_DARKEN_KEYFRAMES = [
    { boxShadow: '0 0 32px #000000bb, 0 0 32px #000000dd inset' },
    { boxShadow: '0 0 32px #000000bb, 0 0 128px #000000dd inset' },
];

const LOSER_PORTRAIT_DARKEN_ANIMATION = { duration: 1000, direction: 'normal' };


// AUDIO

const START_GAME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/start-game.mp3');

const MOUSEOVER_SWISH = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/mouseover-swish.mp3');
const MOUSEOUT_SWISH = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/mouseout-swish.mp3');

const SELECT_YOUR_FIGHTER = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/select-your-fighter.mp3');

const DRUM = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/drum-select.mp3');

const ROCK_ANNOUNCE = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/rock.mp3');
const PAPER_ANNOUNCE = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/paper.mp3');
const SCISSORS_ANNOUNCE = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/scissors.mp3');
const LIZARD_ANNOUNCE = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/lizard.mp3');
const SPOCK_ANNOUNCE = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/spock.mp3');

const ROUND_ONE = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/round-one.mp3');
const ROUND_TWO = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/round-two.mp3');
const FINAL_ROUND = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/final-round.mp3');

const ELECTRIC_SFX = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/electric-shock.mp3');

const ROCK_VS_PAPER_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/paper-covers-rock.mp3');
const ROCK_VS_SCISSORS_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/rock-smashes-scissors.mp3');
const ROCK_VS_LIZARD_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/rock-squashes-lizard.mp3');
const ROCK_VS_SPOCK_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/spock-vaporises-rock.mp3');

const PAPER_VS_SCISSORS_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/scissors-cuts-paper.mp3');
const PAPER_VS_LIZARD_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/lizard-eats-paper.mp3');
const PAPER_VS_SPOCK_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/paper-suffocates-spock.mp3');

const SCISSORS_VS_LIZARD_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/scissors-decapitates-lizard.mp3');
const SCISSORS_VS_SPOCK_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/spock-snaps-scissors.mp3');

const LIZARD_VS_SPOCK_OUTCOME = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/lizard-poisons-spock.mp3');

const DRAW_ANNOUNCE = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/draw.mp3');

const CLASH_SOUND = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/electric-shock-short.mp3');

const LAMP_ON = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/light-on.mp3');

const RESET_SWISH = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/reset-swish.mp3')

const ABHORRENT_SHEARS = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/abhorrent-shears.mp3');


const VICTORIOUS = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/victorious.mp3');
const DEFEATED = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/defeated.mp3');

const VICTORY_STING = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/victory-sting.mp3');
const DEFEAT_STING = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/defeat-sting.mp3')

const LAMP_OFF = new Audio('https://chrislplumb91.github.io/rochambeau-v.2.0/assets/media/light-off.mp3')