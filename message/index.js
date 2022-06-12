import { EOL } from 'os';
import { getName } from '../helpers/index.js';

const printMessage = (message) => {
    process.stdout.write(message + EOL + EOL);
};

const printStartMessage = () => {
    printMessage(`Welcome to the File Manager, ${getName()}!`);
    printCurrentDir();
};

const printCurrentDir = () => {
    printMessage(`You are currently in ${process.env.CURRENT_DIR}`);
};

const printEndMessage = () => {
    printMessage(`Thank you for using File Manager, ${getName()}!`);
};

const printInvalidInputMessage = () => {
    printMessage(`Invalid input`);
};

const printOperationFailedMessage = () => {
    printMessage(`Operation failed`);
};

export {
    printMessage,
    printStartMessage,
    printCurrentDir,
    printEndMessage,
    printInvalidInputMessage,
    printOperationFailedMessage
};
