import * as cache from "@actions/cache";
import * as core from "@actions/core";
import {
  getCacheKeyPrefix,
  getCacheKeyInput,
  getBundleSaveCacheKey,
  getBundleRestoreKeyPrefix,
  resolvedCacheFolder,
} from "./helpers.js";

const prefix = getCacheKeyPrefix();
const cacheKey = getCacheKeyInput();
const vcpkgCachePath = resolvedCacheFolder();

core.setOutput("path", vcpkgCachePath);

await core.group("Restoring vcpkg cache", async () => {
  try {
    const runId = process.env.GITHUB_RUN_ID;
    const saveCacheKey = getBundleSaveCacheKey(prefix, cacheKey, runId);
    const restoreKeyPrefix = getBundleRestoreKeyPrefix(prefix, cacheKey);

    core.info(`Restoring cache with key prefix '${restoreKeyPrefix}'`);
    const restoredKey = await cache.restoreCache([vcpkgCachePath], saveCacheKey, [restoreKeyPrefix]);

    if (restoredKey) {
      core.info(`Cache restored from '${restoredKey}'`);
    } else {
      core.info(`No cache found with key prefix '${restoreKeyPrefix}'`);
    }

    core.saveState("saveCacheKey", saveCacheKey);
  } catch (error) {
    core.setFailed(error);
  }
});
