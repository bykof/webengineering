#!/usr/bin/env bash

python3 -m venv virtualenv
virtualenv/bin/pip install -r requirements.txt
touch passwords.json