import { createReadStream } from 'fs';
import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';
import { printCurrentDir } from '../../message/index.js';
import { EOL } from 'os';

const cat = async(arg) => {
    if (isCorrectArgsCount(1, arg)) {
        const [path] = arg;
        const { pathToTarget, isPathExists } = validatePath(path);

        if (isPathExists) {
            const readable = createReadStream(pathToTarget);

            readable
                .on('data', chunk => process.stdout.write(chunk))
                .on('end', () => {
                    process.stdout.write(`${EOL}${EOL}`);
                    printCurrentDir();
                });
        } else {
            throw new Error('File not exist');
        }
    }
};

export default cat;
