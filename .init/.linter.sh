#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-web-tic-tac-toe-8202-8220/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

