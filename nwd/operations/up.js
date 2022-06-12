import { join } from 'path';
import { isCorrectArgsCount } from '../../helpers/index.js';

const up = async(arg) => {
    if (isCorrectArgsCount(0, arg)) {
        try {
            process.env.CURRENT_DIR = join(process.env.CURRENT_DIR, '..');
        } catch (e) {
            throw new Error(e);
        }
    }
};

export default up;
