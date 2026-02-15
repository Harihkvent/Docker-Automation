"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docker = void 0;
exports.createContainer = createContainer;
exports.startContainer = startContainer;
exports.stopContainer = stopContainer;
exports.removeContainer = removeContainer;
exports.listContainers = listContainers;
exports.listImages = listImages;
const dockerode_1 = __importDefault(require("dockerode"));
let dockerOptions = {};
if (process.platform === "win32") {
    dockerOptions = { socketPath: "//./pipe/docker_engine" };
}
else {
    dockerOptions = { socketPath: "/var/run/docker.sock" };
}
exports.docker = new dockerode_1.default(dockerOptions);
function createContainer(image, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const images = yield exports.docker.listImages();
        const imageExists = images.some((img) => img.RepoTags && img.RepoTags.includes(image));
        if (!imageExists) {
            yield new Promise((resolve, reject) => {
                exports.docker.pull(image, (err, stream) => {
                    if (err)
                        return reject(err);
                    exports.docker.modem.followProgress(stream, (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve(true);
                    }, (event) => {
                        // Optional: progress logging
                        // console.log(event);
                    });
                });
            });
        }
        const container = yield exports.docker.createContainer({
            Image: image,
            name: name,
            Tty: true,
        });
        return container;
    });
}
function startContainer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const container = exports.docker.getContainer(id);
        yield container.start();
    });
}
function stopContainer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const container = exports.docker.getContainer(id);
        yield container.stop();
    });
}
function removeContainer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const container = exports.docker.getContainer(id);
        yield container.remove({ force: true });
    });
}
function listContainers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.docker.listContainers({ all: true });
    });
}
function listImages() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.docker.listImages({ all: true });
    });
}
