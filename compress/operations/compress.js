import { resolve, parse } from 'path';
import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';

const compress = async(args) => {
    if (isCorrectArgsCount(2, args)) {
        try {
            const [from, to] = args;
            const {pathToTarget: fromPath, isPathExists: isFromPathValid} = validatePath(from);
            const {pathToTarget: toPath, isPathExists: isToPathValid} = validatePath(to);

            const {name, ext} = parse(fromPath);
            const resolvedToPath = resolve(toPath, name + ext + '.br');
            const {isPathExists} = validatePath(resolvedToPath);

            if (isFromPathValid && isToPathValid && !isPathExists) {
                const sourceStream = createReadStream(fromPath);
                const destinationStream = createWriteStream(resolvedToPath);
                const brotliCompress = createBrotliCompress();

                pipeline(
                    sourceStream,
                    brotliCompress,
                    destinationStream,
                    (err) => {
                        if (err) throw new Error(err.message);
                    });
            } else throw new Error('File already exist');
        } catch (err) {
            throw new Error(err);
        }
    }
};

export default compress;
