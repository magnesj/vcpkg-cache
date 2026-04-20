cmake_minimum_required(VERSION 3.20)
project(vcpkg-cache-test VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(fmt CONFIG REQUIRED)

add_executable(vcpkg-cache-test src/main.cpp)
target_link_libraries(vcpkg-cache-test PRIVATE fmt::fmt)
