#!/usr/bin/python

import sqlite3

conn = sqlite3.connect('test.db');

print 'Opened database successfully!';

conn.execute('''CREATE TABLE Users
  (ID INTEGER PRIMARY KEY,
  fbID INT NOT NULL UNIQUE, 
  avatar TEXT,
  name TEXT NOT NULL);
  ''');

conn.execute('''CREATE TABLE UsersPlaylists
  (userID INT NOT NULL,
  playlistID INT NOT NULL);
  ''');

conn.execute('''CREATE TABLE Playlists
  (ID INT PRIMARY KEY NOT NULL,
  URL TEXT NOT NULL);
  ''');

print 'Table created successfully!';

conn.close();