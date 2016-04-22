#!/usr/bin/python

import sys
import sqlite3

# try:
#     import simplejson as json
# except (ImportError,):
#     import json

conn = sqlite3.connect('test.db')

if sys.argv[1] == 'GET':
  fbID   = sys.argv[2]
  stmt   = 'SELECT * from Playlists where playlistID={}'.format(sys.argv[2])
  cursor = conn.execute(stmt);
  for row in cursor:
    for field in row:
      print field
  conn.close()
  sys.stdout.flush();

if sys.argv[1] == 'POST':
  print sys.argv[2];
  print sys.argv[3];
  stmt = 'INSERT INTO Playlists (userID, songs) VALUES ({},"{}")'.format(sys.argv[2], sys.argv[3]);
  print stmt
  conn.execute(stmt);
  conn.commit()
  print 'success!'
  sys.stdout.flush();
  conn.close()
