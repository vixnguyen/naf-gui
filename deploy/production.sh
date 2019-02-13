#!/bin/bash

set -e -o pipefail

ssh asiantech@172.16.110.190 "bash Source/deploy/run.sh $1 $2"
