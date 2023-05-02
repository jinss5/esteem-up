-- migrate:up
CREATE TABLE books (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  subtitle VARCHAR(500) NOT NULL,
  author VARCHAR(100) NOT NULL,
  issue_date VARCHAR(100) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  thumbnail VARCHAR(2000) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  sub_category_id INT NOT NULL,
  is_subscribe BOOLEAN NOT NULL 0,
  FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
)
-- migrate:down
DROP TABLE books;