#include <fmt/core.h>

int main() {
    fmt::print("vcpkg-cache test program\n");
    fmt::print("If fmt was restored from the binary cache (not compiled from source),\n");
    fmt::print("the vcpkg-cache bundle action is working correctly.\n");
    return 0;
}
