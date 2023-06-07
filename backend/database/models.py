from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")

# TODO: Add your models below, remember to add a new migration and upgrade database

class Garden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.Text)
    user = db.relationship("User")



class UserGarden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    garden_id = db.Column(db.Integer, db.ForeignKey('garden.id'))

class Plant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    garden_id = db.Column(db.Integer, db.ForeignKey('garden.id'))


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plant_id = db.Column(db.Integer, db.ForeignKey('plant.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    task_type = db.Column(db.String(255), nullable=False)
    task_scheduled = db.Column(db.Date, nullable=False)
    task_completed = db.Column(db.Date)
    user = db.relationship("User")

class Harvest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    rating = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255))
    notes = db.Column(db.Text)
    user = db.relationship("User")