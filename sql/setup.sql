 DROP TABLE if EXISTS model_s;
 
 CREATE TABLE  model_s (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  descript TEXT, 
  model TEXT,
  color TEXT,
  wheel_type TEXT,
  interior TEXT
);
