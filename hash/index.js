import { printMessage } from '../message/index.js';
import { isCorrectArgsCount, validatePath } from '../helpers/index.js';
import { readFile } from 'fs';
import { createHash } from 'crypto';

const hash = async args => {
    if (isCorrectArgsCount(1, args)) {
        try {
            const [filePath] = args;
            const {pathToTarget, isPathExists} = validatePath(filePath);

            if (isPathExists) {
                readFile(pathToTarget, 'utf8', (err, data) => {
                    const hash = createHash('sha256').update(data).digest('hex');

                    printMessage(`Hash: ${hash}`);
                });
            } else throw new Error('File not exist');
        } catch (err) {
            throw new Error(err);
        }
    }
};

export default hash;
