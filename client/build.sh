#!/bin/bash

# Generate a random id
#  $1 = number of characters; defaults to 10
function randid() {
    CHAR="[:alnum:]"
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
cat libs/md5.js libs/json2_mod.js >> $OUTPUT

# append main file
echo -e "\n\n// main //////////////////////////////////////////////////////////////\n\n" >> $OUTPUT
cat main.js >> $OUTPUT
