#!/usr/bin/python

import sys
import sqlite3

conn = sqlite3.connect('test.db')


if sys.argv[1] == 'GET':
  stmt   = 'SELECT * from Users'
  cursor = conn.execute(stmt);
  for row in cursor:
    print row[0]
    print row[1]
    print row[2]
    print row[3]
    print row[4]
  conn.close()
  sys.stdout.flush();

if sys.argv[1] == 'POST':
  fbID   = sys.argv[2]
  name   = sys.argv[3]
  avatar = sys.argv[4]
  stmt   = 'INSERT INTO Users (fbID, name, avatar) VALUES ({},"{}","{}")'.format(fbID, name, avatar);
  conn.execute(stmt);
  conn.commit()
  print 'post success'
  sys.stdout.flush();
  conn.close()

if sys.argv[1] == 'PUT':
  online = sys.argv[2]
  fbID   = sys.argv[3]
  stmt   = 'UPDATE Users SET online = {} where fbID = {}'.format(online, fbID);
  conn.execute(stmt)
  conn.commit()
  print 'put success'
  sys.stdout.flush();
  conn.close()