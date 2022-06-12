import { createReadStream, createWriteStream } from 'fs';
import { isCorrectArgsCount, validatePath } from '../../helpers/index.js';
import { parse, resolve } from 'path';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';

const decompress = async(args) => {
    if (isCorrectArgsCount(2, args)) {
        try {
            const [from, to] = args;
            const {pathToTarget: fromPath, isPathExists: isFromPathValid} = validatePath(from);
            const {pathToTarget: toPath, isPathExists: isToPathValid} = validatePath(to);

            const {name} = parse(fromPath);
            const resolvedToPath = resolve(toPath, name);
            const {isPathExists} = validatePath(resolvedToPath);

            if (isFromPathValid && isToPathValid && !isPathExists) {
                const sourceStream = createReadStream(fromPath);
                const destinationStream = createWriteStream(resolvedToPath);
                const brotliCompress = createBrotliDecompress();

                pipeline(
                    sourceStream,
                    brotliCompress,
                    destinationStream,
                    (err) => {
                        if (err) throw new Error(err.message);
                    });
            } else throw new Error('File already exist or not exist');
        } catch (err) {
            throw new Error(err);
        }
    }
};

export default decompress;
