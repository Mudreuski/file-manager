import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';

const cp = async(args) => {
    if (isCorrectArgsCount(2, args)) {
        const [fileName, targetPathToCopy] = args;
        const {pathToTarget: pathFrom, isPathExists: isFromFileExist} = validatePath(fileName);
        const {pathToTarget: pathTo, isPathExists: isToFileExist} = validatePath(targetPathToCopy);

        if (isFromFileExist && isToFileExist) {
            await createReadStream(pathFrom).pipe(createWriteStream(resolve(pathTo, fileName)));
        } else throw new Error('Incorrect filename or directory');
    }
};

export default cp;
