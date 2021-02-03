#!/bin/bash
if [ -z $1 ]
then
    echo "You should call the script passing the new name as shell script argument."
else
    find . \( -type d -name .git -prune \) -o -type f -exec  sed -i "s/customappname1/$1/g" {} +;
    find . \( -type d -name .git -prune \) -o -type f -exec  sed -i "s/Customappname1/${1^}/g" {} +;
fi