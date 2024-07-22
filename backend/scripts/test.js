const { execSync } = require("child_process");
const dotenv = require("dotenv");
const path = require("path");

// Get the environment file path from environment variable or use default
const envFile = ".env.test";
const envPath = path.resolve(process.cwd(), envFile);

console.log(`Loading environment variables from: ${envPath}`);

// Load environment variables from the specified .env file
const result = dotenv.config({ path: envPath });

// Check for errors while loading the .env file
if (result.error) {
  console.error(
    `Error loading environment variables from ${envPath}:`,
    result.error
  );
  process.exit(1);
}

// Extract the POSTGRES_PORT variable
const POSTGRES_PORT = process.env.POSTGRES_PORT;

if (!POSTGRES_PORT) {
  console.error("POSTGRES_PORT is not defined in the environment variables");
  process.exit(1);
}

// Construct the command dynamically
const command = `docker-compose up -d && cross-env ENV_FILE=${envFile} ./scripts/wait-for-docker.sh localhost ${POSTGRES_PORT} -s -t 60 -- nodemon src/index.ts`;

try {
  // Execute the constructed command
  execSync(command, { stdio: "inherit" });
} catch (error) {
  console.error("Error executing command:", error);
  process.exit(1);
}
