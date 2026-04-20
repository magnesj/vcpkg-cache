import { expect, test } from "vitest";
import { getBundleSaveCacheKey, getBundleRestoreKeyPrefix } from "../src/helpers";

test("getBundleSaveCacheKey should return key with run ID suffix", () => {
  const key = getBundleSaveCacheKey("vcpkg/", "abc123", "42");

  expect(key).toBe("vcpkg/abc123-42");
});

test("getBundleRestoreKeyPrefix should return key prefix for fallback restore", () => {
  const prefix = getBundleRestoreKeyPrefix("vcpkg/", "abc123");

  expect(prefix).toBe("vcpkg/abc123-");
});
