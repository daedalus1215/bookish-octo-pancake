type romanNumeralTypes = 'I' | 'V' | 'X' | 'L' | 'C';

const ROMAN_NUMERALS = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100
};

/**
 * I usually do not need comments for my code, because of method names and package structure. If I was to add some note,
 * explaining why I was doing something, it generally would be in a doc block here. 
 * 
 * I am deciding to do inline comments to better explain individual tradeoffs
 * 
 * @param romanNumeral string of roman numerals eg: IVXLC, CLXI, etc.
 * @returns 
 */
export default function convertRomanNumerals(romanNumeral: string) {
    // If we reuse this elsewhere we could abstract it as a validation function.
    if (!/I|V|X|L|C/.test(romanNumeral)) {
        throw Error("Inappropriate characters used, please stick to I, V, X, L, C, or any combination.");
    }

    // Doing this because I just want to narrow the type. I've already verified that the string adheres to strict format.
    // Since Strings are essentially arrays of characters, I could of actually did a `split('')`, or do this to appease Typescript
    // Since `split('')` would be n(o), I decided not to bother, since we will already be iterating later in `convertMultipleNumeralCharacters`. 
    const romanNumeralCharacters = romanNumeral as unknown as romanNumeralTypes[];

    if (romanNumeralCharacters.length > 1) {
        return convertMultipleNumeralCharacters(romanNumeralCharacters)
    }

    return ROMAN_NUMERALS[romanNumeralCharacters[0]]
};

/**
 * I generally do not like iteration like this. I normally would use reduce/map/flatMap when dealing with collections.
 * 
 * Might of been able to pull this off with a reduce.
 * 
 * @param romanNumeralCharacters 
 * @returns 
 */
const convertMultipleNumeralCharacters = (romanNumeralCharacters: romanNumeralTypes[]) => {
    let firstCharacter: romanNumeralTypes;
    let secondCharacter: romanNumeralTypes;
    let summation = 0;

    if (romanNumeralCharacters.length > 2) {
        for (let i = romanNumeralCharacters.length - 1; i >= 1; i -= 2) {
            firstCharacter = romanNumeralCharacters[i];
            secondCharacter = romanNumeralCharacters[i - 1];
            if (isSubtractScenario(firstCharacter, secondCharacter)) {
                summation += subtract(firstCharacter, secondCharacter);
            } else {
                summation += sum(firstCharacter, secondCharacter);
            }
        }
    } else {
        firstCharacter = romanNumeralCharacters[0];
        secondCharacter = romanNumeralCharacters[1];
        if (isSubtractScenario(secondCharacter, firstCharacter)) {
            summation += subtract(secondCharacter, firstCharacter);
        } else {
            summation += sum(firstCharacter, secondCharacter);
        }
    }

    return summation;
};

/**
 * We definitely do not want to subtract if the first and second characters are the same. 
 * @param firstCharacter 
 * @param secondCharacter 
 * @returns 
 */
const isSubtractScenario = (firstCharacter: romanNumeralTypes, secondCharacter: romanNumeralTypes) => (
    (secondCharacter === 'I' || secondCharacter === 'X') && (firstCharacter !== secondCharacter));

const sum = (firstCharacter: romanNumeralTypes, secondCharacter: romanNumeralTypes): number => ROMAN_NUMERALS[firstCharacter] + ROMAN_NUMERALS[secondCharacter];
const subtract = (firstCharacter: romanNumeralTypes, secondCharacter: romanNumeralTypes): number => ROMAN_NUMERALS[firstCharacter] - ROMAN_NUMERALS[secondCharacter];
