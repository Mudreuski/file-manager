import { normalize, resolve, dirname } from 'path';
import { existsSync } from 'fs';
import { printInvalidInputMessage } from '../message/index.js';

const transformStringIntoArray = (value, separator = ' ') => {
    return value.toString().trim().split(separator);
};

const getName = () => {
    const argName = process.argv[2];
    const prefix = '--username=';

    if (!argName || !argName.startsWith('--username=')) throw new Error('Name is incorrect or not exist');

    return argName.slice(prefix.length, argName.length);
};

const isValidInput = (input, availableOperations) => {
    const inputLength = input.length;
    const [ operation, argument1, argument2 ] = input;

    if (
        !operation ||
        inputLength < 0 ||
        inputLength > 3 ||
        inputLength === 2 && !argument1 ||
        inputLength === 3 && (!argument1 || !argument2) ||
        !availableOperations.hasOwnProperty(operation)
    ) return false;

    return true;
};

const validatePath = (path) => {
    const pathToTarget = normalize(resolve(process.env.CURRENT_DIR, path));
    const isPathExists = existsSync(pathToTarget);

    return { pathToTarget, isPathExists };
};

const endProcess = () => process.stdin.destroy();

const isCorrectArgsCount = (count, args) => {
    if (args.length === count) return true;

    printInvalidInputMessage();
    return false;
};

export {
    transformStringIntoArray,
    getName,
    isValidInput,
    validatePath,
    endProcess,
    isCorrectArgsCount
};
