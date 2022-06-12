import { homedir } from 'os';
import { printStartMessage, printEndMessage } from './message/index.js';
import { router } from './router.js';
import { endProcess } from './helpers/index.js';

const runProcess = () => {
    process.env.CURRENT_DIR = homedir;
    printStartMessage();

    process.stdin
        .on('data', router)
        .on('close', printEndMessage);

    process.on('SIGINT', endProcess);
};

runProcess();
