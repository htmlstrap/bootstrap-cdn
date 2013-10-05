#/bin/bash
#!/usr/local/bin/bash

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

# Current Versions

BootstrapV="3.0.0"
FontAwesomeV="3.2.1"

 function run_tests {

## 200 OK Reposnse Tests
# Test 1
   assert_equal "`$Curl -sI http://s3-us-west-1.amazonaws.com/bootstrap-cdn/public/index.html |$Grep HTTP |$Awk {'print $2'}`" \
   "202" \
   "${red}index.html on S3 is not returning a 200${NC}"

# Test 2
   assert_equal "`$Curl -sI http://s3-us-west-1.amazonaws.com/bootstrap-cdn/public/bootstrap/3.0.0/css/bootstrap.no-icons.min.css |$Grep HTTP |$Awk {'print $2'}`" \
   "200" \
   "${red}bootstrap.no-icons.min.css S3 is not returning a 200${NC}"

# Test 3
   assert_equal "`$Curl -sI https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css |$Grep HTTP |$Awk {'print $2'}`" \
   "200" \
   "${red}bootstrap.min.css 3.0.0 on the edge is not returning a 200${NC}"


 # Test 4
   assert_equal "`$Curl -sI https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js |$Grep HTTP |$Awk {'print $2'}`" \
   "200" \
   "${red}bootstrap.min.js 3.0.0 on the edge is not returning a 200${NC}"

# Test 5
   assert_equal "`$Curl -sI https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.no-icons.min.css |$Grep HTTP |$Awk {'print $2'}`" \
   "200" \
   "${red}bootstrap.no-icons.min.css on the edge is not returning a 200${NC}"

 # Test 6
   assert_equal "`$Curl -sI https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css |$Grep HTTP |$Awk {'print $2'}`" \
   "200" \
   "${red}font-awesome.min.css is not returning a 200${NC}"

 }

# #CDN



netdna.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css
# netdna.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css

# netdna.bootstrapcdn.com/bootswatch/3.0.0/amelia/bootstrap.min.css
# netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css

# #Fonts
# for ext in ttf svg eot woff; 
# 	do curl -I netdna.bootstrapcdn.com/font-awesome/latest/font/fontawesome-webfont.{$ext};
# done
	
source cli-tester.sh