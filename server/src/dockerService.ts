import Docker from "dockerode";
import os from "os";
import path from "path";

// Cross-platform Docker connection
let dockerOptions: any = {};

if (process.platform === "win32") {
  dockerOptions = { socketPath: "//./pipe/docker_engine" };
} else {
  dockerOptions = { socketPath: "/var/run/docker.sock" };
}

const docker = new Docker(dockerOptions);

export const createContainer = async (image: string, name: string) => {
  return await docker.createContainer({
    Image: image,
    name,
    Tty: true,
    HostConfig: {
      Binds: [`${path.resolve("./data")}:/data`], // cross-platform safe
    },
  });
};

export const startContainer = async (id: string) => {
  const container = docker.getContainer(id);
  await container.start();
};

export const stopContainer = async (id: string) => {
  const container = docker.getContainer(id);
  await container.stop();
};

export const removeContainer = async (id: string) => {
  const container = docker.getContainer(id);
  await container.remove({ force: true });
};

export const listContainers = async () => {
  return await docker.listContainers({ all: true });
};
