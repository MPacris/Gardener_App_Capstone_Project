from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Garden, UserGarden, Plant, Harvest
from database.schemas import garden_schema, gardens_schema



class UserGardenResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_gardens = Garden.query.filter_by(user_id=user_id).all()
        return gardens_schema.dump(user_gardens), 200


    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_garden = garden_schema.load(form_data)
        new_garden.user_id = user_id
        db.session.add(new_garden)
        db.session.commit()
        return garden_schema.dump(new_garden), 201
    