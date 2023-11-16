const serverNewConfig: BasicConfig = {
    protocol: "http",
    port: 3000,
}
const backupConfig: BasicConfig = {
    protocol: "https",
    port: 3001,
}

interface BasicConfig {
    protocol: string,
    port: number
}

const startNewServerFunc = (config: BasicConfig): "Server started" => {

    console.log(`Server started on ${config.protocol}://server:${config.port}`);

    return "Server started";

}

startNewServerFunc(backupConfig);

