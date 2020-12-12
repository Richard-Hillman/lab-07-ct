 DROP TABLE if EXISTS model_s CASCADE;
 DROP TABLE if EXISTS consumer;
 
 CREATE TABLE  model_s (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  descript TEXT, 
  model TEXT,
  color TEXT,
  wheel_type TEXT,
  interior TEXT
);

CREATE TABLE consumer (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  description TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  location TEXT NOT NULL,
  models_id BIGINT REFERENCES model_s(id) 
);
