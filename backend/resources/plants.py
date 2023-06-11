import os
from flask import request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from werkzeug.utils import secure_filename
from flask_restful import Resource
from database.models import db, Plant
from database.schemas import plant_schema, plants_schema

class PlantsResource(Resource):
    
    @jwt_required()
    def get(self):
        plants = Plant.query.all()
        return plants_schema.dump(plants), 200

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_plant = plant_schema.load(form_data)
        new_plant.user_id = user_id
        db.session.add(new_plant)
        db.session.commit()
        return plant_schema.dump(new_plant), 201
    

class GetPlantResource(Resource):
    
    @jwt_required()
    def put(self, plant_id):
        plant = Plant.query.filter_by(id=plant_id).first()
        if not plant:
            return {'message': 'Plant not found'}, 404

        update_data = request.get_json()
        updated_plant = plant_schema.load(update_data, partial=True)
        plant.type = updated_plant.type
        plant.location = updated_plant.location
        plant.image_url = updated_plant.image_url
        plant.garden_id = updated_plant.garden_id
        db.session.commit()

        return plant_schema.dump(plant), 200

    
    @jwt_required()
    def delete(self, plant_id):

        plant = Plant.query.filter_by(id=plant_id).first()
        if not plant:
            return {'message': 'Plant not found'}, 404

        db.session.delete(plant)
        db.session.commit()

        return {'message': 'Plant deleted'}, 200
    
    @jwt_required()
    def get(self, plant_id):
        plant = Plant.query.filter_by(id=plant_id).first()
        return plant_schema.dump(plant), 200
    

class PlantImageUploadResource(Resource):
    def post(self):
        if 'plant_image' not in request.files:
            return 'no_file', 404   
        file = request.files['plant_image']
        
        if file.filename == '':
            return 'filename_empty', 404
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            return 'Success', 201
        
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


   