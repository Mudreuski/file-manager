import { printCurrentDir, printInvalidInputMessage, printOperationFailedMessage } from './message/index.js';
import { isValidInput, transformStringIntoArray, endProcess } from './helpers/index.js';
import { up, ls, cd } from './nwd/index.js';
import { cat, add, rn, cp, mv, rm } from './fs/index.js';
import os from './os/index.js';
import hash from './hash/index.js';
import { compress, decompress } from './compress/index.js';

const availableOperations = {
    up,
    ls,
    cd,
    cat,
    add,
    rn,
    cp,
    mv,
    rm,
    os,
    hash,
    compress,
    decompress,
    '.exit': endProcess
};

export const router = async input => {
    try {
        const formattedInput = transformStringIntoArray(input);
        if (!isValidInput(formattedInput, availableOperations)) printInvalidInputMessage();
        else {
            const [ operation, ...args ] = formattedInput;
            await availableOperations[operation](args);

            if (operation !== '.exit') printCurrentDir();
        }
    }
    catch (error) {
        console.log(error);
        printOperationFailedMessage();
    }
};
