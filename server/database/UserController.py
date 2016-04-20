#!usr/bin/python
#this controller will handle all get, post, put and delete requests for the Users table

import sqlite3
import sys

#connect to database
conn = sqlite3.connect('test.db')
print "Type of Request: ", sys.argv[1];

if sys.argv == "GET"
  cursor = conn.execute('SELECT * from SGN where');
  for row in cursor:
    print "ROW = ", row
    print "ID = ", row[0]
    print "NAME = ", row[1], "\n"

  print 'Records created successfully';
  conn.close()

conn.execute('DELETE from SGN where id=3');
conn.commit();
print 'Total number of rows deleted :', conn.total_changes;

cursor = conn.execute('SELECT id, name from SGN');
for row in cursor:
  print "ROW = ", row
  print "ID = ", row[0]
  print "NAME = ", row[1], "\n"

conn = sqlite3.connect('test.db')
print 'Opened database successfully';

conn.execute('INSERT INTO SGN (ID, NAME) \
  VALUES (1, "Allen")');

conn.execute('INSERT INTO SGN (ID, NAME) \
  VALUES (2, "Tedd")');

conn.execute('INSERT INTO SGN (ID, NAME) \
  VALUES (3, "Frank")');

conn.commit()
print 'Records created successfully';
conn.close()

sys.stdout.flush();