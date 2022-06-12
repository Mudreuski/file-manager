import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';

const cd = async(arg) => {
    if (isCorrectArgsCount(1, arg)) {
        try {
            const [path] = arg;
            const {pathToTarget, isPathExists} = validatePath(path);

            if (isPathExists) process.env.CURRENT_DIR = pathToTarget;
            else throw new Error('Dir not exists');
        } catch (e) {
            throw new Error(e);
        }
    }
};

export default cd;
