//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Literal types

let msg: "hello" = "hello";

msg = "hello";

//========================================================================================================================================================

const port3000: number = 3000;
const port3001: number = 3001;

function startServer(protocol: "http" | "https", port: 3000 | 3001): "Server started" {

    if (port === port3000 || port === port3001) {
        console.log(`Server started on ${protocol}://server:${port}`);
    } else {
        console.log("INVALID PORT");
    }

    return "Server started";

}

startServer("https", 3000);

//========================================================================================================================================================

function createAnimation(
    id: string | number,
    animationName: string,
    timingFunction: 'ease' | 'ease-out' | 'ease-in' = 'ease',
    duration: number,
    iterationCount: "infinite" | number
): void {

    // const element = document.querySelector(`#${id}`) as HTMLElement;

    // if (element) {
    console.log(`${animationName} ${timingFunction} ${duration} ${iterationCount}`);
    // element.style.animation = `${animationName} ${timingFunction} ${duration} ${iterationCount}`;
    // }

}

createAnimation('id', 'fade', 'ease', 5, 'infinite');

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// type aliases

type AnimationTimingFunc = 'ease' | 'ease-out' | 'ease-in';
type ID = string | number;
type IterationCount = "infinite" | number;

function createAnimationTwo(
    id: ID,
    animationName: string,
    timingFunction: AnimationTimingFunc = 'ease',
    duration: number,
    iterationCount: IterationCount,
): void {

    // const element = document.querySelector(`#${id}`) as HTMLElement;

    // if (element) {
    console.log(`${animationName} ${timingFunction} ${duration} ${iterationCount}`);
    // element.style.animation = `${animationName} ${timingFunction} ${duration} ${iterationCount}`;
    // }

};

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Object Literals and Function Annotations

type Config = { protocol: "http" | "https"; port: 3000 | 3001 };

type Role = {
    role: string;
}

type ConfigWithRole = Config & Role; // & - intersection

const serverConfig: ConfigWithRole = {
    protocol: 'https',
    port: 3001,
    role: 'admin'
};

//========================================================================================================================================================

type StartFunctionAnnotation = (protocol: "http" | "https", port: 3000 | 3001) => string; /* FUNCTION ANNOTATION */

const startServerFunction: StartFunctionAnnotation /* ANNOTATION */
    = (protocol, port): "Server started" => {

        console.log(`Server started on ${protocol}://server:${port}`);

        return "Server started";

    }

startServerFunction(serverConfig.protocol, serverConfig.port);

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Interfaces

interface ConfigTwo {
    protocol: "http" | "https";
    port: 3000 | 3001;
    log: (msg: string) => void;
}

interface RoleTwo {
    role: string;
}

interface ConfigWithRoleTwo extends ConfigTwo, RoleTwo {/* test: string; */};

const serverConfiguration: ConfigWithRoleTwo = {
    protocol: "http",
    port: 3000,
    role: 'admin',
    log: (msg: string): void => console.log(msg),
};

type StartFunctionAnnotationTwo = (protocol: "http" | "https", port: 3000 | 3001, log: (msg: string) => void) => string; /* FUNCTION ANNOTATION */

const startServerFunc: StartFunctionAnnotationTwo = (protocol, port, log): "Server started" => {

    log(`Server started on ${protocol}://server:${port}`);

    return "Server started";

}

startServerFunc(serverConfiguration.protocol, serverConfiguration.port, serverConfiguration.log);

//========================================================================================================================================================

interface Styles {
    [key: string]: string
}

const styles: Styles = {
    position: 'absolute',
    top: '20px',
    left: '50px'
}