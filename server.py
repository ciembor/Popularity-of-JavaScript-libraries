#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import os
import sys
import operator
import cgi
import json
import urllib
import couchdb
from collections import defaultdict

print('Access-Control-Allow-Origin: *')
print('Content-type: text/html')
print('')

# configuration ########################################

COUCH_USER = "database_username"
COUCH_PASS = "database_pass"

DB_URL = "http://localhost.localdomain:5984/"
DB_NAME = "pojsl"

PASSWORD = "client_password"

# connect to database ##################################

try:
  couch = couchdb.Server(DB_URL)
  couch.resource.credentials = (COUCH_USER, COUCH_PASS)
except Exception:
  print("can't connect to couchdb")
  sys.exit(1)

try:
  db = couch[DB_NAME]
except Exception:
  print("can't connect to database")
  sys.exit(1)

# get form sent by browser #############################

try:
  form = cgi.FieldStorage()
  password = form["pass"].value
  data = form["json"].value
except Exception:
  print("incomplete parameters")
  sys.exit(1)

# if password is ok, parse data ########################

if password == PASSWORD:

  print(data)

  try:
    data = urllib.unquote(data)
  except Exception:
    print("can't unquote data")
    sys.exit(1)
  try:
    data = json.loads(data)
  except Exception:
    print("can't parse json")
    sys.exit(1)
  try:
    db.save(data)
  except Exception:
    print("can't save data  ")
    sys.exit(1)

else:
  print("wrong password")
  sys.exit(1)  
