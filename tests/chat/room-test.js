const chai = require('chai');
const expect = chai.expect;

const Room = require('./../../chat/class/Room');
const Color = require('./../../chat/class/Color');

describe('Room class', () => {
    const room = new Room('name', 'username', Color.getRandomColorHueAndFontColor());

    it('get name', () => {
        expect(room.name).to.equal('name');
    });

    it('set name', () => {
        room.name = 'test';
        expect(room.name).to.equal('test');
    });

    it('get ownerUsername', () => {
        expect(room.ownerUsername).to.equal('username');
    });

    it('set ownerUsername', () => {
        room.ownerUsername = 'ownerUsername';
        expect(room.ownerUsername).to.equal('ownerUsername');
    });

    it('get colorSet', () => {
        expect(room.colorSet).to.have.property('color');
        expect(room.colorSet).to.have.property('hue');
        expect(room.colorSet).to.have.property('fontColor');
    });

    it('set colorSet', () => {
        const colorSet = Color.getRandomColorHueAndFontColor();
        room.colorSet = colorSet;

        expect(room.colorSet.color).to.equal(colorSet.color);
        expect(room.colorSet.hue).to.equal(colorSet.hue);
        expect(room.colorSet.fontColor).to.equal(colorSet.fontColor);
    });

    it('get number of users', () => {
        expect(room.numberOfUsers).to.equal(0);
    });

    it('connect users', () => {
        expect(room.numberOfUsers).to.equal(0);
        room.userConnected();
        expect(room.numberOfUsers).to.equal(1);
        room.userConnected();
        room.userConnected();
        expect(room.numberOfUsers).to.equal(3);
    });

    it('disconnect users', () => {
        expect(room.numberOfUsers).to.equal(3);
        room.userDisconnected();
        expect(room.numberOfUsers).to.equal(2);
        room.userDisconnected();
        room.userDisconnected();
        expect(room.numberOfUsers).to.equal(0);
        room.userDisconnected();
        expect(room.numberOfUsers).to.equal(0);
    });


});