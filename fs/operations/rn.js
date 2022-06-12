import { rename } from 'fs';
import { join } from 'path';
import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';

const rn = async(args) => {
    if (isCorrectArgsCount(2, args)) {
        const [oldFileName, newFileName] = args;
        const {pathToTarget, isPathExists} = validatePath(oldFileName);
        const pathToNewFile = join(process.env.CURRENT_DIR, newFileName);

        if (isPathExists) {
            await rename(pathToTarget, pathToNewFile, (err) => {
                if (err) throw new Error('Operation failed');
            });
        } else throw new Error('File not exist');
    }
};

export default rn;
