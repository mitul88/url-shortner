import { app } from "./app";
import { cpus } from "os";
import cluster from "cluster";
import { ENV_CONFIG } from "./config/env.config";

const PORT = ENV_CONFIG.PORT;

if (cluster.isPrimary) {
  const availableCpus = cpus();
  console.log(
    `Clustering to ${availableCpus.length} processes! will take some seconds to start the server, please be patient.`
  );
  availableCpus.forEach(() => cluster.fork());
} else {
  const { pid } = process;
  app.listen(PORT, () => {
    console.log(`Running process: ${pid}, on port: ${PORT}`);
  });
}
