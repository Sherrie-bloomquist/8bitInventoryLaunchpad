CREATE TABLE items(
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(50),
	color VARCHAR(50),
	size VARCHAR(20)
);

INSERT INTO items (name, color, size) VALUES ('fishy', 'mermaid treasure', 'medium');
