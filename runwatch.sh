#!bin/bash

echo "Hello, you are running sass --watch!"

dir=$(dirname $0)
echo "The directory is " \"$dir\".
echo "Converting /scss/style.scss => /css/style.css"

echo "SASS is running, happy coding bebe :-)"

sudo sass --watch $dir/scss/style.scss:$dir/css/style.css  --style expanded 

echo "\n SASS finished working, GOOD BY!!!"

