#!/bin/bash

## AUTHOR: Justin Dorfman (@jdorfman)
## DATE: 10-04-201
## VERSION: 0.0.1
## USAGE: $ bash header-check.sh

#Which
Grep="`/usr/bin/which grep`"
Awk="`/usr/bin/which awk`"
Cat="`/usr/bin/which cat`"
Sed="`/usr/bin/which sed`"
Curl="`/usr/bin/which curl`"

#Colors

red='\e[0;31m'
yellow='\e[1;33m'
green='\e[1;32m'
NC='\e[0m'

 function run_tests {

## 200 Reposnse Tests
# Test 1
   assert_equal "`$Curl -sI http://s3-us-west-1.amazonaws.com/bootstrap-cdn/public/index.html |$Grep HTTP |$Awk {'print $2'}`" \
   "202" \
   "${red}index.html on S3 is not returning a 200${NC}"

# Test 2
   assert_equal "`$Curl -sI http://s3-us-west-1.amazonaws.com/bootstrap-cdn/public/bootstrap/3.0.0/css/bootstrap.no-icons.min.css |$Grep HTTP |$Awk {'print $2'}`" \
   "200" \
   "${red}bootstrap.no-icons.min.css S3 is not returning a 200${NC}"

 }

# #Origins
# time curl -I www.bootstrapcdn.com
# time curl -I http://s3-us-west-1.amazonaws.com/bootstrap-cdn/public/index.html
# time curl -I http://s3-us-west-1.amazonaws.com/bootstrap-cdn/public/bootstrap/3.0.0/css/bootstrap.no-icons.min.css

# #CDN
# time curl -I netdna.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css
# time curl -I netdna.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.js
# time curl -I netdna.bootstrapcdn.com/bootstrap/latest/css/bootstrap.no-icons.min.css

# time curl -I netdna.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css
# time curl -I netdna.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css

# time curl -I netdna.bootstrapcdn.com/bootswatch/3.0.0/amelia/bootstrap.min.css
# time curl -I netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css

# #Fonts
# for ext in ttf svg eot woff; 
# 	do curl -I netdna.bootstrapcdn.com/font-awesome/latest/font/fontawesome-webfont.{$ext};
# done
	
source cli-tester.sh