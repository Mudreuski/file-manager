import { writeFile } from 'fs';
import { resolve } from 'path';
import { isCorrectArgsCount } from '../../helpers/index.js';

const add = async(arg) => {
    if (isCorrectArgsCount(1, arg)) {
        const [filename] = arg;
        const targetPath = resolve(process.env.CURRENT_DIR, filename);

        await writeFile(targetPath, '', (err) => {
            if(err) throw new Error(err.message);
        });
    }
};

export default add;
