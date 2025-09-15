import Docker from "dockerode";

let dockerOptions: any = {};

if (process.platform === "win32") {
  dockerOptions = { socketPath: "//./pipe/docker_engine" };
} else {
  dockerOptions = { socketPath: "/var/run/docker.sock" };
}

export const docker = new Docker(dockerOptions);

export async function createContainer(image: string, name: string) {
  const images = await docker.listImages();
  const imageExists = images.some(
    (img) => img.RepoTags && img.RepoTags.includes(image)
  );

  if (!imageExists) {
    await new Promise((resolve, reject) => {
      docker.pull(image, (err, stream) => {
        if (err) return reject(err);

        docker.modem.followProgress(
          stream,
          (err: any) => {
            if (err) reject(err);
            else resolve(true);
          },
          (event: any) => {
            // Optional: progress logging
            // console.log(event);
          }
        );
      });
    });
  }

  const container = await docker.createContainer({
    Image: image,
    name: name,
    Tty: true,
  });

  return container;
}

export async function startContainer(id: string) {
  const container = docker.getContainer(id);
  await container.start();
}

export async function stopContainer(id: string) {
  const container = docker.getContainer(id);
  await container.stop();
}

export async function removeContainer(id: string) {
  const container = docker.getContainer(id);
  await container.remove({ force: true });
}

export async function listContainers() {
  return await docker.listContainers({ all: true });
}
