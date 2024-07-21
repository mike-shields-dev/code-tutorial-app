/**
 * A function that only logs to the console if
 * the environment variable NODE_ENV is "development"
 * @param data - The data to be output to the console
 * @returns - void
 */

function devModeLog(...data: any): void {
  if (process.env.NODE_ENV !== "development") return;
  console.log(...data);
}

/**
 * A function that only warns to the console if
 * the environment variable NODE_ENV is "development"
 * @param data - The data to be output to the console
 * @returns - void
 */
function developmentModeConsoleWarn(...data: any): void {
  if (process.env.NODE_ENV !== "development") return;
  console.warn(...data);
}

/**
 * A function that only errors to the console if
 * the environment variable NODE_ENV is "development"
 * @param data - The data to be output to the console
 * @returns - void
 */
function devModeError(...data: any): void {
  if (process.env.NODE_ENV !== "development") return;
  console.error(...data);
}

/**
 * A function that only errors to the console if
 * the environment variable NODE_ENV is "development"
 * @param data - The data to be output to the console
 * @returns - void
 */
function devModeTrace(...data: any): void {
  if (process.env.NODE_ENV !== "development") return;
  console.trace(...data);
}

/**
 *
 * @param data - The data stream to be piped via a WritableStream to the provided output method.
 * @param outputMethod - The method that handles the WritableStream.
 */
function pipeStreamToLogger(
  data: ReadableStream<string>,
  outputMethod: (...data: any) => void
) {
  data.pipeTo(
    new WritableStream({
      write(data) {
        outputMethod(data);
      },
    })
  );
}

export {
  devModeError,
  devModeLog,
  developmentModeConsoleWarn,
  devModeTrace,
  pipeStreamToLogger,
};
