#!/usr/bin/python

import sqlite3

conn = sqlite3.connect('test.db');

print 'Opened database successfully!';

conn.execute('''CREATE TABLE Users
  (ID INTEGER PRIMARY KEY,
  fbID INT NOT NULL UNIQUE, 
  avatar VARCHAR(255),
  online INTEGER,
  name TEXT NOT NULL);
  ''');

conn.execute('''CREATE TABLE UsersPlaylists
  (userID INT NOT NULL,
  playlistID INT NOT NULL);
  ''');

conn.execute('''CREATE TABLE Playlists
  (playlistID INT PRIMARY KEY,
  userID TEXT,
  songs TEXT);
  ''');

conn.execute('''CREATE TABLE Songs
  (contentID INTEGER,
  songTitle TEXT);
  ''');

print 'Table created successfully!';

conn.close();