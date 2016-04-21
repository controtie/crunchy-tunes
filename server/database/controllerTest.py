#!/usr/bin/python

import sys
import sqlite3

conn = sqlite3.connect('test.db')

if sys.argv[1] == 'POST':
  fbID   = sys.argv[2]
  name   = sys.argv[3]
  avatar = sys.argv[4]
  stmt   = 'INSERT INTO Users (fbID, name, avatar) VALUES ({},"{}","{}")'.format(fbID, name, avatar);
  conn.execute(stmt);
  conn.commit()
  print 'success'
  sys.stdout.flush();
  conn.close()


if sys.argv[1] == 'GET':
  fbID   = sys.argv[2]
  stmt   = 'SELECT * from Users where fbID={}'.format(sys.argv[2])
  cursor = conn.execute(stmt);
  for row in cursor:
    print row[0]
    print row[1]
    print row[2]
    print row[3]
  conn.close()
  sys.stdout.flush();