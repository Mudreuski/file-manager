import { printInvalidInputMessage, printMessage } from '../message/index.js';
import { EOL, cpus, homedir, userInfo, arch } from 'os';

const getEol = () => {
    printMessage(`Default EOL: ${JSON.stringify(EOL)}`);
};

const getCpus = () => {
    const cpusList = cpus();

    const transformedCpusList = cpusList.map(cpu => {
        const { model, speed } = cpu;
        const speedInGHz = `${speed / 1000}GHz`;

        return `{${EOL}  model: ${model}, ${EOL}  speed: ${speedInGHz} ${EOL}}`;
    });

    printMessage(transformedCpusList.join(EOL));
};

const getHomeDir = () => {
    printMessage(`Home directory: ${homedir}`);
};

const getUserName = () => {
    const { username } = userInfo();
    printMessage(`Username: ${username}`);
};

const getArchitecture = () => {
    const architecture = arch();
    printMessage(`Architecture: ${architecture}`);
}

const OS_OPERATIONS = {
    '--EOL': getEol,
    '--cpus': getCpus,
    '--homedir': getHomeDir,
    '--username': getUserName,
    '--architecture': getArchitecture,
};

const os = async args => {
    try {
        const [osArgument] = args;
        const isArgValid = OS_OPERATIONS.hasOwnProperty(osArgument);

        isArgValid
            ? OS_OPERATIONS[osArgument]()
            : printInvalidInputMessage();
    } catch(err) {
        throw new Error(err);
    }
};

export default os;
