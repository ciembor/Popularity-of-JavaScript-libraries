#!/bin/bash

# Generate a random id
#  $1 = number of characters; defaults to 10
#  $2 = include special characters; 1 = yes, 0 = no; defaults to 1
function randid() {
  [ "$2" == "0" ] && CHAR="[:alnum:]" || CHAR="[:graph:]"
    cat /dev/urandom | tr -cd "$CHAR" | head -c ${1:-10}
    echo
}

# set output file name
OUTPUT="client.user.js"

# output file with config.js
cat config.js > $OUTPUT

# append variable with random id 
echo -e "var ID = \"$(randid)\";" >> $OUTPUT

# append js libraries
echo -e "\n\n// libraries /////////////////////////////////////////////////////////\n\n" >> $OUTPUT
cat libs/md5.js libs/json2.js >> $OUTPUT

# append main file
echo -e "\n\n// main //////////////////////////////////////////////////////////////\n\n" >> $OUTPUT
cat main.js >> $OUTPUT
