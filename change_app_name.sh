#!/bin/bash
if [ -z $1 ]
then
    echo "You should call the script passing the new name as shell script argument."
else
    echo "changing id customappname2 to $1 in all files..."
    find . \( -type d -name .git -prune -name node_modules -prune \) -o -type f -exec  sed -i "s/customappname2/$1/g" {} +;
    echo "changing id customappname2 to $1 in all nginx.conf..."
    find ../../../nginx/ \( -type d -name .git -prune -name node_modules -prune \) -o -type f -exec  sed -i "s/customappname2/$1/g" {} +;
    echo "changing namespace customappname2 to ${1^} in all files..."
    find . \( -type d -name .git -prune -name node_modules -prune \) -o -type f -exec  sed -i "s/Customappname2/${1^}/g" {} +;
    echo "Done."
fi