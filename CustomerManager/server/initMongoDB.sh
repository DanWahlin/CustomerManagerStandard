#! /bin/bash

scriptDir=$(dirname $0)

mongo ${scriptDir}/lib/initialMongoData.js

echo -
echo Your data is loaded
read -p "Press [Enter] exit..."
