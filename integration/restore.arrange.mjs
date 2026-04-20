import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as cache from "@actions/cache";
import * as core from "@actions/core";

const archivePath = path.resolve(process.env.ARCHIVE_PATH);
const cacheKey = `${process.env.EXPECTED_CACHE_KEY_PREFIX}${process.env.RESTORE_RUN_ID_SEED}`;

const folder = path.join(archivePath, "00");
const file = path.join(folder, `${process.env.EXPECTED_RESTORED_ABI}.zip`);

await fs.mkdir(folder, { recursive: true });
await fs.writeFile(file, "");

core.info(`Saving bundle cache entry '${cacheKey}' using path '${archivePath}'`);

await cache.saveCache([archivePath], cacheKey);

await fs.rm(archivePath, { recursive: true });
