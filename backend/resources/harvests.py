from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Harvest
from database.schemas import harvest_schema, harvests_schema



class HarvestsResource(Resource):
    @jwt_required()
    def get(self):
        user_harvests = Harvest.query.all()
        return harvests_schema.dump(user_harvests), 200


    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_harvest = harvest_schema.load(form_data)
        new_harvest.user_id = user_id
        db.session.add(new_harvest)
        db.session.commit()
        return harvest_schema.dump(new_harvest), 201
    

class GetHarvestResource(Resource):
    
    

    def get(self, harvest_id): 
        harvest = Harvest.query.filter_by(id=harvest_id).first()
        if not harvest:
            return {'message': 'Harvest not found'}, 404

        return harvest_schema.dump(harvest), 200
    
    
    
    @jwt_required()
    def put(self, harvest_id):
        harvest = Harvest.query.filter_by(id=harvest_id).first()
        if not harvest:
            return {'message': 'Garden not found'}, 404

        update_data = request.get_json()
        updated_harvest = harvest_schema.load(update_data, partial=True)
        harvest.rating = updated_harvest.rating
        harvest.image_url = updated_harvest.image_url
        harvest.notes = updated_harvest.notes
        db.session.commit()

        return harvest_schema.dump(harvest), 200

    @jwt_required()
    def delete(self, harvest_id):
        harvest = Harvest.query.filter_by(id=harvest_id).first()
        if not harvest:
            return {'message': 'Harvest not found'}, 404

        db.session.delete(harvest)
        db.session.commit()

        return {'message': 'Harvest deleted'}, 200
    