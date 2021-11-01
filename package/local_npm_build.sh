#!/bin/bash

echo building Library
# rm -rf lib
# rm -rf node_modules
npm run build
cd lib
npm link


echo loading the library in example project
cd ../../example
rm -rf node_modules
npm link node-jotter

echo changing directory back to the package
cd ../package