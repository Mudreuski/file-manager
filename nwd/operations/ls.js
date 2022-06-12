import { readdir } from 'fs/promises';
import { printMessage } from '../../message/index.js';
import { EOL } from 'os';
import { isCorrectArgsCount } from '../../helpers/index.js';

const ls = async(arg) => {
    if (isCorrectArgsCount(0, arg)) {
        try {
            const files = await readdir(process.env.CURRENT_DIR);
            printMessage(files.join(EOL));
        } catch (e) {
            throw new Error(e);
        }
    }
};

export default ls;
