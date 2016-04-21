#!/usr/bin/python

import sys
import sqlite3

try:
    import simplejson as json
except (ImportError,):
    import json

conn = sqlite3.connect('test.db')

if sys.argv[1] == 'GET':
  fbID   = sys.argv[2]
  stmt   = 'SELECT * from Songs where name="{}"'.format(sys.argv[2])
  cursor = conn.execute(stmt);
  for row in cursor:
    for field in row:
      print field
  conn.close()
  sys.stdout.flush();

if sys.argv[1] == 'POST':
  result = json.loads(sys.argv[2])
  for song in result: 
    contentID = song['contentID']
    songTitle = song['songTitle']
    stmt      = 'INSERT INTO Songs (contentID, songTitle) VALUES ("{}","{}")'.format(contentID, songTitle);
    conn.execute(stmt);
    conn.commit()
    print 'success!'
  sys.stdout.flush();
  conn.close()
