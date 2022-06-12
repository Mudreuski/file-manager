import { rename } from 'fs';
import { resolve } from 'path';
import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';

const mv = async(args) => {
    if (isCorrectArgsCount(2, args)) {
        const [fileName, targetPathToMove] = args;
        const {pathToTarget: pathFrom, isPathExists: isFromFileExist} = validatePath(fileName);
        const {pathToTarget: pathTo, isPathExists: isToFileExist} = validatePath(targetPathToMove);

        if (isFromFileExist && isToFileExist) {
            await rename(pathFrom, resolve(pathTo, fileName), (err) => {
                if (err) throw new Error(err.message);
            });
        } else throw new Error('Incorrect filename or directory');
    }
};

export default mv;

