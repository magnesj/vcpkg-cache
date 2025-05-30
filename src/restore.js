import * as cache from "@actions/cache";
import * as core from "@actions/core";
import { CACHE_KEY_PREFIX, getCachePath, getExistingCacheEntries, resolvedCacheFolder } from "./helpers.js";

const token = core.getInput("token", { required: true });
const prefix = core.getInput("prefix") || "";
core.setOutput("path", resolvedCacheFolder(prefix));

await core.group("Restoring vcpkg cache", async () => {
  const actionsCaches = await getExistingCacheEntries(token);

  if (actionsCaches.length < 1) {
    core.info(`No cache entries found with prefix '${CACHE_KEY_PREFIX}'`);
    return;
  }

  await Promise.all(
    actionsCaches.map(async (cacheKey) => {
      const cacheRestorePath = getCachePath(cacheKey, prefix);
      core.info(`Restoring '${cacheKey}' to '${cacheRestorePath}'`);

      await cache.restoreCache([cacheRestorePath], cacheKey, undefined, undefined, true);
    })
  );
});
