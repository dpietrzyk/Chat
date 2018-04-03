class Color {
    static get hues() {
        return [
            'lighten-3',
            'lighten-2',
            'lighten-1',
            '',
            'darken-1',
            'darken-2',
            'darken-3',
        ];
    }

    static get colors() {
        return [
            'red',
            'pink',
            'purple',
            'deep-purple',
            'indigo',
            'blue',
            'light-blue',
            'cyan',
            'teal',
            'green',
            'light-green',
            'lime',
            'yellow',
            'amber',
            'orange',
            'deep-orange',
            'brown',
            'grey',
            'blue-grey',
        ];
    }

    static getRandomColor() {
        return Color.colors[Math.floor(Math.random() * Color.colors.length)];
    }

    static getRandomHue() {
        return Color.hues[Math.floor(Math.random() * Color.hues.length)];
    }

    static adjustFontColorToHue(hue) {
        const re = /(darken)/;
        return (re.test(hue) ? 'white' : 'black') + '-text';
    }

    static getRandomColorHueAndFontColor() {

        const color = Color.getRandomColor();
        const hue = Color.getRandomHue();
        const fontColor = Color.adjustFontColorToHue(hue);

        return {color, hue, fontColor};
    }
}

module.exports = Color;