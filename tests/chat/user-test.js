const chai = require('chai');
const expect = chai.expect;

const User = require('./../../chat/class/User');
const Color = require('./../../chat/class/Color');

describe('User class', () => {
    const user = new User('username', 10, 'room', Color.getRandomColorHueAndFontColor());

    it('get username', () => {
        expect(user.username).to.equal('username');
    });

    it('set username', () => {
        user.username = 'test';
        expect(user.username).to.equal('test');
    });

    it('[disable] get socket ID', () => {
        expect(user.sockedID).to.equal(undefined);
    });

    it('set socket ID', () => {
        user.socketID = 11;
        expect(user.sockedID).to.equal(undefined);
    });

    it('get room', () => {
        expect(user.room).to.equal('room');
    });

    it('set room', () => {
        user.username = 'test';
        expect(user.username).to.equal('test');
    });

    it('compare valid socket ID', () => {
        expect(user.hasThisSocketID(10)).to.equal(true);
    });

    it('compare invalid socket ID', function () {
        expect(user.hasThisSocketID(11)).to.equal(false);
    });

    it('get privateRoomHash', () => {
        expect(user.privateRoomHash).to.be.a('string');
        expect(user.privateRoomHash).to.have.lengthOf(16);
    });

    it('get colorSet', () => {
        expect(user.colorSet).to.have.property('color');
        expect(user.colorSet).to.have.property('hue');
        expect(user.colorSet).to.have.property('fontColor');
    });

    it('get color', () => {
        expect(user.color).to.be.a('string');
    });

    it('get hue', () => {
        expect(user.hue).to.be.a('string');
    });

    it('get fontColor', () => {
        expect(user.fontColor).to.be.a('string');
    });

    it('set color', () => {
        user.color = 'red';
        expect(user.color).to.equal('red');
    });

    it('set hue', () => {
        user.hue = 'lighten-1';
        expect(user.hue).to.equal('lighten-1');
    });

    it('set fontColor', () => {
        user.fontColor = 'red-text';
        expect(user.fontColor).to.equal('red-text');
    });

});