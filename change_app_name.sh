#!/bin/bash
if [ -z $1 ]
then
    echo "You should call the script passing the new name as shell script argument."
else
    echo "changing id opbridge to $1 in all files..."
    find . \( -type d -name .git -prune -name node_modules -prune \) -o -type f -exec  sed -i "s/customappname1/$1/g" {} +;
    echo "changing id opbridge to $1 in all nginx.conf..."
    find ../../../nginx/ \( -type d -name .git -prune -name node_modules -prune \) -o -type f -exec  sed -i "s/unimedocs/$1/g" {} +;
    echo "changing namespace Opbridge to ${1^} in all files..."
    find . \( -type d -name .git -prune -name node_modules -prune \) -o -type f -exec  sed -i "s/Customappname1/${1^}/g" {} +;
    echo "Done."
fi