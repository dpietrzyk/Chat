const chai = require('chai');
const expect = chai.expect;

const Color = require('./../../chat/class/Color');

describe('Color static class', () => {

    it('get random color', () => {
        expect(Color.getRandomColor()).to.be.a('string');
    });

    it('get random hue', () => {
        expect(Color.getRandomHue()).to.be.a('string');
    });

    it('get random set', () => {
        expect(Color.getRandomColorHueAndFontColor()).to.have.a.property('color');
        expect(Color.getRandomColorHueAndFontColor()).to.have.a.property('hue');
        expect(Color.getRandomColorHueAndFontColor()).to.have.a.property('fontColor');
    });

    it('adjust dark font color', () => {
        const hue1 = 'lighten-1';
        expect(Color.adjustFontColorToHue(hue1)).to.equal('black-text');
        const hue2 = '';
        expect(Color.adjustFontColorToHue(hue2)).to.equal('black-text');
    });

    it('adjust light font color', () => {
        const hue = 'darken-1';
        expect(Color.adjustFontColorToHue(hue)).to.equal('white-text');
    });

});