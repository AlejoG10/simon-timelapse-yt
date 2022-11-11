// CONSTANTS AND VARIABLES

const colors = ['green', 'red', 'yellow', 'blue'];
let playing = false;
let level = 0;
let clicks = 0;
let pattern = [];

// FUNCTIONS

const restart = (() => {
    playing = false;
    level = 0;
    pattern = [];
    $('p').text('SIMON');
});

const checkSequence = (color => {
    if(pattern[clicks] !== color) {
        alert('Lost!');
        restart();
    }
});

const animateClick = ((color, clickClass) => {
    $('#' + color).addClass(clickClass);
    setTimeout(() => {
        $('#' + color).removeClass(clickClass);
    }, 150);
});

const animateSequence = (idx => {
    let color = pattern[idx];
    setTimeout(() => {
        $('#' + color).fadeOut(200).fadeIn(200);
        if(++idx < pattern.length) {
            animateSequence(idx);
        }
    }, 500);
});

const nextSequence = (() => {
    let idx = Math.floor(Math.random() * 4);
    let newColor = colors[idx];
    pattern.push(newColor);
    $('p').text(++level);
});

// ACTION LISTENERS

$('.color-btn').click(e => {
    let color = e.target.id;
    let clickClass = color + '-click';
    if(playing) {
        animateClick(color, clickClass);
        checkSequence(color);
        if(++clicks === level) {
            clicks = 0;
            nextSequence();
            animateSequence(0);
        }
    }
});

$('.play-click').click(() => {
    if(!playing) {
        clicks = 0;
        nextSequence();
        animateSequence(0);
        playing = true;
    }
});