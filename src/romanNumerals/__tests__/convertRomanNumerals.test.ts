import { expect } from 'chai';
import 'mocha';
import convertRomanNumerals from '../convertRomanNumerals';

describe('convertRomanNumerals', () => {
    it('should throw error when passed unapproved character', () => {
        // Arrange, Act, Assert
        expect(() => convertRomanNumerals('D')).throw('Inappropriate characters used, please stick to I, V, X, L, C, or any combination');
    });

    it('should return 1 when I is passed in', () => {
        // Arrange
        const expected = 1;

        // Act
        const actual = convertRomanNumerals('I');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 5 when V is passed in', () => {
        // Arrange
        const expected = 5;

        // Act
        const actual = convertRomanNumerals('V');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 10 when X is passed in', () => {
        // Arrange
        const expected = 10;

        // Act
        const actual = convertRomanNumerals('X');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 50 when L is passed in', () => {
        // Arrange
        const expected = 50;

        // Act
        const actual = convertRomanNumerals('L');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 100 when C is passed in', () => {
        // Arrange
        const expected = 100;

        // Act
        const actual = convertRomanNumerals('C');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 2 when II is passed in', () => {
        // Arrange
        const expected = 2;

        // Act
        const actual = convertRomanNumerals('II');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 4 when IV is passed in', () => {
        // Arrange
        const expected = 4;

        // Act
        const actual = convertRomanNumerals('IV');

        // Assert
        expect(actual).to.be.equal(expected);
    });
    it('should return 8 when VIII is passed in', () => {
        // Arrange
        const expected = 8;

        // Act
        const actual = convertRomanNumerals('VIII');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 89 when LXXXIX is passed in', () => {
        // Arrange
        const expected = 89;

        // Act
        const actual = convertRomanNumerals('LXXXIX');

        // Assert
        expect(actual).to.be.equal(expected);
    });

    it('should return 92 when XCII is passed in', () => {
        // Arrange
        const expected = 92;

        // Act
        const actual = convertRomanNumerals('XCII');

        // Assert
        expect(actual).to.be.equal(expected);
    });
});