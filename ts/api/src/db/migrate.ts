import pool, { execute } from './mysql.connector';

(async () => {
  await execute(`
    CREATE TABLE IF NOT EXISTS users(id INT NOT NULL AUTO_INCREMENT, username VARCHAR(100),
    first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL, phone VARCHAR(15), created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id))
  `, [])

  await execute(`
    CREATE TABLE IF NOT EXISTS asteroids(id INT NOT NULL, name VARCHAR(20), date DATE NOT NULL,
    absolute_magnitude_h FLOAT NOT NULL, estimated_diameter VARCHAR(400) NOT NULL,
    is_potentially_hazardous_asteroid BOOL NOT NULL, close_approach_data VARCHAR(500), orbital_data VARCHAR(1200),
    is_sentry_object BOOL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id))
  `, [])

  await execute(`
    CREATE TABLE IF NOT EXISTS favorites(favorite_id INT NOT NULL AUTO_INCREMENT, asteroid INT NOT NULL,
    user INT NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asteroid) REFERENCES asteroids(id), FOREIGN KEY (user) REFERENCES users(id), PRIMARY KEY (favorite_id))
  `, [])

  pool.end()
})()
