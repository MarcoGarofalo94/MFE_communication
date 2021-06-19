echo "changing id lcntable to $1 in all nginx.conf..."
find ../../../nginx/ -type d \( -name .git -o  -name node_modules  \) -prune -o -type f -exec  sed -i "s/lcntable/$1/g" {} +;
docker exec localnextcloud_nginx_1 nginx -s reload
