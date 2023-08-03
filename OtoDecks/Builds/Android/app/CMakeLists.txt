# Automatically generated CMakeLists, created by the Projucer
# Don't edit this file! Your changes will be overwritten when you re-save the Projucer project!

cmake_minimum_required(VERSION 3.4.1)

project(juce_jni_project)

set(BINARY_NAME "juce_jni")

add_library("cpufeatures" STATIC "${ANDROID_NDK}/sources/android/cpufeatures/cpu-features.c")
set_source_files_properties("${ANDROID_NDK}/sources/android/cpufeatures/cpu-features.c" PROPERTIES COMPILE_FLAGS "-Wno-sign-conversion -Wno-gnu-statement-expression")

add_definitions([[-DJUCE_ANDROID=1]] [[-DJUCE_ANDROID_API_VERSION=16]] [[-DJUCER_ANDROIDSTUDIO_7F0E4A25=1]] [[-DJUCE_APP_VERSION=1.0.0]] [[-DJUCE_APP_VERSION_HEX=0x10000]])

include_directories( AFTER
    "../../../JuceLibraryCode"
    "${ANDROID_NDK}/sources/android/cpufeatures"
)

enable_language(ASM)

if(JUCE_BUILD_CONFIGURATION MATCHES "DEBUG")
    add_definitions([[-DJUCE_DISPLAY_SPLASH_SCREEN=1]] [[-DJUCE_USE_DARK_SPLASH_SCREEN=1]] [[-DJUCE_PROJUCER_VERSION=0x70005]] [[-DJUCE_GLOBAL_MODULE_SETTINGS_INCLUDED=1]] [[-DJUCE_STANDALONE_APPLICATION=1]] [[-DJUCER_ANDROIDSTUDIO_7F0E4A25=1]] [[-DJUCE_APP_VERSION=1.0.0]] [[-DJUCE_APP_VERSION_HEX=0x10000]] [[-DDEBUG=1]] [[-D_DEBUG=1]])
elseif(JUCE_BUILD_CONFIGURATION MATCHES "RELEASE")
    add_definitions([[-DJUCE_DISPLAY_SPLASH_SCREEN=1]] [[-DJUCE_USE_DARK_SPLASH_SCREEN=1]] [[-DJUCE_PROJUCER_VERSION=0x70005]] [[-DJUCE_GLOBAL_MODULE_SETTINGS_INCLUDED=1]] [[-DJUCE_STANDALONE_APPLICATION=1]] [[-DJUCER_ANDROIDSTUDIO_7F0E4A25=1]] [[-DJUCE_APP_VERSION=1.0.0]] [[-DJUCE_APP_VERSION_HEX=0x10000]] [[-DNDEBUG=1]])
else()
    message( FATAL_ERROR "No matching build-configuration found." )
endif()

add_library( ${BINARY_NAME}

    SHARED

    "../../../Source/Main.cpp"
    "../../../Source/MainComponent.h"
    "../../../Source/MainComponent.cpp"
    "../../../JuceLibraryCode/JuceHeader.h"
)

set_source_files_properties(
    "../../../Source/MainComponent.h"
    "../../../JuceLibraryCode/JuceHeader.h"
    PROPERTIES HEADER_FILE_ONLY TRUE)

if( JUCE_BUILD_CONFIGURATION MATCHES "DEBUG" )
    target_compile_options( ${BINARY_NAME} PRIVATE "-fsigned-char" )
endif()

if( JUCE_BUILD_CONFIGURATION MATCHES "RELEASE" )
    target_compile_options( ${BINARY_NAME} PRIVATE "-fsigned-char" )
endif()

find_library(log "log")
find_library(android "android")
find_library(glesv2 "GLESv2")
find_library(egl "EGL")

target_link_libraries( ${BINARY_NAME}

    ${log}
    ${android}
    ${glesv2}
    ${egl}
    "cpufeatures"
)
