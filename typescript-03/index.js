//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Literal types
var msg = "hello";
msg = "hello";
//========================================================================================================================================================
var port3000 = 3000;
var port3001 = 3001;
function startServer(protocol, port) {
    if (port === port3000 || port === port3001) {
        console.log("Server started on ".concat(protocol, "://server:").concat(port));
    }
    else {
        console.log("INVALID PORT");
    }
    return "Server started";
}
startServer("https", 3000);
//========================================================================================================================================================
function createAnimation(id, animationName, timingFunction, duration, iterationCount) {
    // const element = document.querySelector(`#${id}`) as HTMLElement;
    if (timingFunction === void 0) { timingFunction = 'ease'; }
    // if (element) {
    console.log("".concat(animationName, " ").concat(timingFunction, " ").concat(duration, " ").concat(iterationCount));
    // element.style.animation = `${animationName} ${timingFunction} ${duration} ${iterationCount}`;
    // }
}
createAnimation('id', 'fade', 'ease', 5, 'infinite');
function createAnimationTwo(id, animationName, timingFunction, duration, iterationCount) {
    // const element = document.querySelector(`#${id}`) as HTMLElement;
    if (timingFunction === void 0) { timingFunction = 'ease'; }
    // if (element) {
    console.log("".concat(animationName, " ").concat(timingFunction, " ").concat(duration, " ").concat(iterationCount));
    // element.style.animation = `${animationName} ${timingFunction} ${duration} ${iterationCount}`;
    // }
}
;
var serverConfig = {
    protocol: 'https',
    port: 3001,
    role: 'admin'
};
var startServerFunction = function (protocol, port) {
    if (port === port3000 || port === port3001) {
        console.log("Server started on ".concat(protocol, "://server:").concat(port));
    }
    else {
        console.log("INVALID PORT");
    }
    return "Server started";
};
startServerFunction(serverConfig.protocol, serverConfig.port);
;
