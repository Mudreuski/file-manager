import * as fs from 'fs';
import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';

const rm = async(arg) => {
    if (isCorrectArgsCount(1, arg)) {
        const [filename] = arg;
        const {pathToTarget, isPathExists} = validatePath(filename);

        if (isPathExists) {
            await fs.rm(pathToTarget, err => {
                if (err) throw new Error('Operation failed');
            });
        } else throw new Error('File not exist');
    }
};

export default rm;
