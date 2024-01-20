// email must be unique

create table users (
  id int primary key auto_increment,
  email varchar(255) unique not null,
  password varchar(255) not null,
  role varchar(10) default 'user',
  name varchar(255),
  photo varchar(255),
  status varchar(255),
  aboutMe text(1000),
  phone varchar(10),
  vk varchar(10),
  city varchar(20),
  country varchar(20),
  created_at timestamp default current_timestamp,
  updated_at datetime default current_timestamp on update current_timestamp
);