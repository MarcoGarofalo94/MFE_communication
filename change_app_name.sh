#!/bin/bash
find . -type f -exec  sed -i "s/customappname/$1/g" {} +