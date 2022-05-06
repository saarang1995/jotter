import { Logger, LoggerConfiguration } from "node-jotter";
import { Environment } from "node-jotter/lib/enums/environment.enum";

const loggerConfiguration: LoggerConfiguration = {
  filename: "local.log",
  environment: Environment.development,
  serviceName: "example",
  level: "debug",
};
const logger = new Logger(loggerConfiguration);

logger.info("HEllo this is a test", { test: "Hi" });

logger.fatal("Table not found", new Error("Missing table User"), {
  source: "database",
});

logger.error("Low User balance", new Error("Balance calculator crashed"), {
  source: "Balance table",
  userName: "ElA",
});
