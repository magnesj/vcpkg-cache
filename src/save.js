import * as cache from "@actions/cache";
import * as core from "@actions/core";
import { resolvedCacheFolder } from "./helpers.js";

const vcpkgCachePath = resolvedCacheFolder();

await core.group("Saving vcpkg cache", async () => {
  try {
    const saveCacheKey = core.getState("saveCacheKey");

    if (!saveCacheKey) {
      core.warning("No save cache key found. Skipping save.");
      return;
    }

    core.info(`Saving vcpkg cache with key '${saveCacheKey}'`);
    await cache.saveCache([vcpkgCachePath], saveCacheKey);
  } catch (error) {
    core.setFailed(error);
  }
});
