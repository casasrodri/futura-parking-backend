const COLORS = {
    reset: 0,
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
};

const BACKGROUNDS = {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47,
};

function color(text, color = COLORS.black, background = BACKGROUNDS.black) {
    return `\x1b[${color};${background}m${text}\x1b[0m`;
}

export { COLORS, BACKGROUNDS, color };
