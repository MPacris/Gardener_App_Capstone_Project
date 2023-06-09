from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Garden, UserGarden, Plant, Harvest, Task
from database.schemas import task_schema, tasks_schema



class TasksResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_tasks = Task.query.filter_by(user_id=user_id).all()
        return tasks_schema.dump(user_tasks), 200


    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_task = task_schema.load(form_data)
        new_task.user_id = user_id
        db.session.add(new_task)
        db.session.commit()
        return task_schema.dump(new_task), 201
    

class GetTaskResource(Resource):
    
    
    @jwt_required()
    def get(self, task_id):
        user_id = get_jwt_identity()
        task = Task.query.filter_by(id=task_id, user_id=user_id).first()
        if not task:
            return {'message': 'Task not found'}, 404

        return task_schema.dump(task), 200
    
    
    
    @jwt_required()
    def put(self, task_id):
        user_id = get_jwt_identity()
        task = Task.query.filter_by(id=task_id, user_id=user_id).first()
        if not task:
            return {'message': 'Garden not found'}, 404

        update_data = request.get_json()
        updated_task = task_schema.load(update_data, partial=True)
        task.user_id = updated_task.user_id
        task.plant_id = updated_task.plant_id
        task.task_type = updated_task.task_type
        task.task_scheduled = updated_task.task_scheduled
        task.task_completed = updated_task.task_completed
        db.session.commit()

        return task_schema.dump(task), 200

    @jwt_required()
    def delete(self, task_id):
        user_id = get_jwt_identity()
        task = Task.query.filter_by(id=task_id, user_id=user_id).first()
        if not task:
            return {'message': 'Task not found'}, 404

        db.session.delete(task)
        db.session.commit()

        return {'message': 'Task deleted'}, 200
    