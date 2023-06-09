/* Replace with your SQL commands */
create table passwords (
	id serial primary key,
	encrypted_name varchar(255) not null,
	encrypted_value text not null,
	owner varchar(255) not null,
	created_at timestamp not null,
	updated_at timestamp not null,
	
	foreign key (owner) references users(username) on delete cascade
);