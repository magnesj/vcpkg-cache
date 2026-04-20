import * as core from "@actions/core";
import * as path from "path";

export const CACHE_FOLDER = ".vcpkg-cache";

export const getCacheKeyPrefix = () => core.getInput("prefix") || "vcpkg/";

export const getCacheKeyInput = () => core.getInput("cache-key", { required: true });

export const resolvedCacheFolder = () => path.resolve(CACHE_FOLDER);

export const getBundleSaveCacheKey = (prefix, cacheKey, runId) => `${prefix}${cacheKey}-${runId}`;

export const getBundleRestoreKeyPrefix = (prefix, cacheKey) => `${prefix}${cacheKey}-`;
