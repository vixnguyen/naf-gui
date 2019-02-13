#!/bin/bash

set -e -o pipefail
# set -e pipefail

set -e
  reset="\033[0m"
  red="\033[31m"
  green="\033[32m"
  yellow="\033[33m"
  cyan="\033[36m"
  white="\033[37m"
  BUILD_ENV=""
  ENV_NAME=""
  password=""
  version=""
  SUDO=""
  PUBLIC_HTML="/var/www/html/"
  SOURCE_DIR="Source"

shopt -s extglob

check_sudo() {
  local status=$?
  if [ $status -ne 0 ]; then
    SUDO="sudo -S"

    printf "$cyan> Enter PASSWORD for sudo: $reset"
    read -s password
    printf "\n"
  fi
}

env_suggestion() {
  printf "$red> No environment specified! Please use one of following options:$reset\n"
  printf "${yellow}  --stg $green for Staging$reset\n"
  printf "${yellow}  --prod$green for Production$reset\n"
  exit
}

pre_build() {
  cd $SOURCE_DIR
  printf "$yellow> Clean up build artifacts...$reset\n"
  rm -rdf dist

  printf "$cyan> Checking files changed...$reset\n"
  git status

  printf "$yellow> Reset files changed before fetching:$yellow\n"
  git checkout .

  printf "$cyan> Checking for new release...$reset\n"
  git fetch -q --tags

  printf "$cyan> Available versions:$reset\n"
  git tag

  printf "$cyan> Enter a VERSION to build: $reset"
  read version
  printf "\n"

  git checkout tags/$version
  printf "$cyan> Checked out $(git describe --tags)!$reset\n"
}

build() {
  printf "$cyan> Starting a $ENV_NAME build process...$reset\n"
  # echo $password | $SUDO npm run reinstall && npm run build.$BUILD_ENV
  npm install && npm run build.$BUILD_ENV

  printf "$green> Version $version build successful!$reset\n"
}

suspend() {
  printf "$cyan> Starting suspended the $ENV_NAME server...$reset\n"
  # echo $password | $SUDO npm run reinstall && npm run build.$BUILD_ENV
  npm run suspend.$BUILD_ENV

  printf "$green> Maintenance page generate successful!$reset\n"
}

deploy() {
  printf "$yellow> Removing old code...\n"
  sudo -S rm -rf $PUBLIC_HTML*

  printf "$cyan> Moving new app to root folder...\n"
  sudo -S mv ~/$SOURCE_DIR/build/* $PUBLIC_HTML

  if [ "$2" = "--maintenance" ]; then
    printf "$red> Server $ENV_NAME has suspended!$reset\n"
  else
    printf "$green> Version $version deployed on $ENV_NAME!$reset\n"
  fi
}

execute_build() {
  unset BUILD_ENV
  unset ENV_NAME
  if [ "$1" = "--prod" ]; then
    export BUILD_ENV=prod
    export ENV_NAME=Production
  elif [ "$1" = "--stg" ]; then
    export BUILD_ENV=stg
    export ENV_NAME=Staging
  else
    env_suggestion
  fi

  printf "${cyan}tttttttttttttttttttttttttttttttttttttttttttt..............................................\n"
  printf "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..............................................\n"
  printf "aaaaaaaaaaaaaaaaaa         aaaaaaaaaaaaaaaaa..............................................\n"
  printf "aaaaaaaaaaaaaaaa    aaaaaa   aaaaaaaaaaaaaaa..............................................\n"
  printf "aaaaaaaaaaaaaaaa   aaaaaaa   aaaaaaaaaaaaaaa........                      ................\n"
  printf "aaaaaaaaaaaaaaaa    aaaaaa   aaaaaaaaaaaaaaa........  ffffffff . eeeeeee  ................\n"
  printf "aaaaaaaaaaaaaaaaaa    aaa    aaa aaaaaaaaaaa........  fff     .. eee      ................\n"
  printf "aaaaaaaaaaaaaaaaaaaaaaaaaaaa  a   tttttttttt........  fffffff  . eeeeeee  ................\n"
  printf "ttttttttttttttttttttttttttttttt   tttttttttt........  fff   .... eee      ................\n"
  printf "tttttttttttttttttttttttttttttt        tttttt........  fff   .... eeeeeee  ................\n"
  printf "ttttttttttttttttttttttttttttttt   tttttttttt........                      ................\n"
  printf "ttttttttttttttttttttttttttttttt   ttt  ttttt..............................................\n"
  printf "ttttttttttttttttttttttttttttttttt   tttttttt..............................................\n"
  printf "tttttttttttttttttttttttttttttttttttttttttttt..............................................\n"
  printf "tttttttttttttttttttttttttttttttttttttttttttt..............................................\n"
  printf "${reset}                                                                                  \n"


  pre_build $1 $2

  if [ "$2" = "--maintenance" ]; then
    suspend $1 $2
  else
    build $1 $2
  fi
  
  if [ -d "$PUBLIC_HTML" ]; then
    deploy $1 $2
  else
    printf "$red> No such $PUBLIC_HTML to deploy app$reset\n"
  fi
}

execute_build $1 $2
