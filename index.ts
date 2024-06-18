import { parseArgs } from "jsr:@std/cli/parse-args";
import { $boolean, $object, $string, $tuple } from "jsr:@showichiro/validators";

/**
 * Asynchronously loads a JSON file specified by the input path.
 *
 * @param {string} path The file path of the JSON file to load.
 * @returns {Promise<unknown>} A promise that resolves with the content of the loaded JSON file.
 * @throws {Error} When the JSON file could not be loaded.
 */
const loadFile = async (path: string): Promise<unknown> => {
  try {
    const { default: json } = await import(path, { with: { type: "json" } });
    return json;
  } catch (_) {
    throw new Error("Failed to load JSON");
  }
};

/**
 * Asynchronously retrieves the version number from a JSON file located at the specified path.
 *
 * @param {string} path The file path of the JSON file to load and read.
 * @returns {Promise<string>} A promise that resolves with the version number from the JSON file.
 * @throws {Error} When the JSON file does not contain a 'version' key or could not be validated.
 */
export const getVersion = async (path: string): Promise<string> => {
  const json = await loadFile(path);
  const jsonValidator = $object({
    version: $string,
  }, false);
  if (!jsonValidator(json)) {
    throw new Error("The key 'version' is missing");
  }
  return json.version;
};

if (import.meta.main) {
  const HELP = `
  Usage: get-version [path]

  This command retrieves the version number from a JSON file located at the specified path.

  Options:
    -h, --help      Show this help message.
  ` as const;
  const argsValidator = $object({
    _: $tuple([$string]),
  }, false);
  const args = parseArgs(Deno.args);
  if ($boolean(args?.h ?? args?.help)) {
    console.log(HELP);
    Deno.exit(0);
  }
  if (!argsValidator(args)) {
    console.error("Invalid arguments");
    console.log(HELP);
    Deno.exit(1);
  }
  try {
    const version = await getVersion(args._[0]);
    console.log(version);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      Deno.exit(1);
    }
  }
}
