import { app } from "./app";
import { ENV_CONFIG } from "./config/env.config";

const PORT = ENV_CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
