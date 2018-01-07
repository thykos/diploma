# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(first_name: 'Bruce', last_name: 'Wayne', email: 'user@example.com', birth_date: DateTime.current - 18.years, password: 'password')
User.create(first_name: 'Clark', last_name: 'Kent', email: 'user1@example.com', birth_date: DateTime.current - 20.years, password: 'password')
Card.create(number: '5194265041905146', cvv2: 123, expiry_date: DateTime.now + 2.years, user_id: User.first.id)
Card.create(number: '5188846460460065', cvv2: 123, expiry_date: DateTime.now + 2.years, user_id: User.second.id)
