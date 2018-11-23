#!/bin/bash
mkdir packages/$1
cd packages/$1
yarn init -y
cd ../../
lerna add BaseTool # optional