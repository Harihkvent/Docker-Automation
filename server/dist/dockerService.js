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
exports.listContainers = exports.removeContainer = exports.stopContainer = exports.startContainer = exports.createContainer = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const path_1 = __importDefault(require("path"));
// Cross-platform Docker connection
let dockerOptions = {};
if (process.platform === "win32") {
    dockerOptions = { socketPath: "//./pipe/docker_engine" };
}
else {
    dockerOptions = { socketPath: "/var/run/docker.sock" };
}
const docker = new dockerode_1.default(dockerOptions);
const createContainer = (image, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield docker.createContainer({
        Image: image,
        name,
        Tty: true,
        HostConfig: {
            Binds: [`${path_1.default.resolve("./data")}:/data`], // cross-platform safe
        },
    });
});
exports.createContainer = createContainer;
const startContainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const container = docker.getContainer(id);
    yield container.start();
});
exports.startContainer = startContainer;
const stopContainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const container = docker.getContainer(id);
    yield container.stop();
});
exports.stopContainer = stopContainer;
const removeContainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const container = docker.getContainer(id);
    yield container.remove({ force: true });
});
exports.removeContainer = removeContainer;
const listContainers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield docker.listContainers({ all: true });
});
exports.listContainers = listContainers;
