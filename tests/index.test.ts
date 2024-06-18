import { assert } from "@std/assert";
import { getVersion } from "../index.ts";
import { $const, $string } from "@showichiro/validators";

Deno.test("getVersion", async (t) => {
  await t.step("local file", async () => {
    const version = await getVersion("./tests/valid.json");
    assert($string(version));
  });

  await t.step("local file invalid path", async () => {
    try {
      await getVersion("./tests/invalidpath.json");
    } catch (e: unknown) {
      assert(e instanceof Error);
      if (e instanceof Error) {
        assert($const("Failed to load JSON")(e.message));
      }
    }
  });

  await t.step("local file invalid json", async () => {
    try {
      await getVersion("./tests/invalid.json");
    } catch (e: unknown) {
      assert(e instanceof Error);
      if (e instanceof Error) {
        assert($const("The key 'version' is missing")(e.message));
      }
    }
  });

  await t.step("local file not json", async () => {
    try {
      await getVersion("./tests/test.yaml");
    } catch (e: unknown) {
      assert(e instanceof Error);
      if (e instanceof Error) {
        assert($const("Failed to load JSON")(e.message));
      }
    }
  });

  await t.step("local file full path", async () => {
    const version = await getVersion(`${import.meta.dirname}/valid.json`);
    assert($string(version));
  });

  await t.step("remote file", async () => {
    const version = await getVersion(
      "https://raw.githubusercontent.com/Showichiro/typescript-validators/main/deno.json",
    );
    assert($string(version));
  });
});
