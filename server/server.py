from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
from bson import ObjectId
from pymongo import MongoClient
from gridfs import GridFS
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
from flask_session import Session
# from flask_jwt_extended import create_access_token, JWTManager
import os

load_dotenv()

# app instance
app = Flask(__name__)

app.config["MONGO_URI"] = str(os.getenv('MONGO_URI'))
app.config['SESSION_TYPE'] = 'filesystem'
app.config['JWT_SECRET_KEY'] = str(os.getenv('SECRET_KEY'))

mongo = PyMongo(app)
Session(app)
CORS(app)

bcrypt = Bcrypt(app)

# Connect to MongoDB using pymongo for GridFS
client = MongoClient(str(os.getenv('MONGO_URI')))
db = client.get_database()
fs = GridFS(db)

# Registration API
@app.route('/register/<user_type>', methods=['POST'])
def register(user_type):
    data = request.get_json()

    # Check if the required fields are present
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']

    # Check if the username already exists
    if mongo.db.users.find_one({'username': username}):
        return jsonify({'error': 'Username already exists'}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert user into the database
    user_id = mongo.db.users.insert_one({'username': username, 'password': hashed_password, 'user_type': user_type}).inserted_id

    return jsonify({'message': f'{user_type.capitalize()} registered successfully', 'user_id': str(user_id)}), 201

# Login API
@app.route('/login/<user_type>', methods=['POST'])
def login(user_type):
    data = request.get_json()

    # Check if the required fields are present
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']

    # Retrieve user from the database
    user = mongo.db.users.find_one({'username': username, 'user_type': user_type})

    if user and bcrypt.check_password_hash(user['password'], password):
        claims = {'user_type': user['user_type'], 'username': user['username']}
        token = create_access_token(identity=str(user['_id']), additional_claims=claims)
        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# Create class
@app.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    if 'name' not in data:
        return jsonify({'error': 'Missing classroom name'}), 400
    
    name = data['name']
    teacher = data['username']
    class_code = mongo.db.classrooms.insert_one({'name': name, 'teacher': teacher}).inserted_id
    mongo.db.users.update_one({'username': teacher}, {'$push': {'classrooms': class_code}})

    return jsonify({'message': f'Classroom created successfully with class-code: {class_code}'}), 201

# Join class
@app.route('/join', methods=['POST'])
def join():
    data = request.get_json()
    if 'code' not in data:
        return jsonify({'error': 'Missing classroom code'}), 400
    
    class_code = data['code']
    student = data['username']

    classroom = mongo.db.classrooms.find_one({'_id': ObjectId(class_code)})

    if(classroom == None):
        return jsonify({'error': 'Invalid classroom code'}), 400
    
    if(mongo.db.users.find_one({'username': student, 'classrooms': ObjectId(class_code)})):
        return jsonify({'error': 'Student already enrolled in classroom'}), 400

    mongo.db.users.update_one({'username': student}, {'$push': {'classrooms': ObjectId(class_code)}})

    return jsonify({'message': 'Classroom joined successfully'}), 201

# Get classes
@app.route('/classes/<username>')
def get_classes(username):
    user = mongo.db.users.find_one({'username': username})
    classrooms = user['classrooms']
    print(classrooms)
    classes = []
    for classroom in classrooms:
        class_info = mongo.db.classrooms.find_one({'_id': classroom})
        classes.append({'name': class_info['name'], 'teacher': class_info['teacher'] ,'class_code': str(classroom)})
    return jsonify({'classes': classes}), 200

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    username = request.form['username']
    assignment_id = request.form['assignment_id']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Ensure a secure filename
        filename = secure_filename(file.filename)

        # Save the file to MongoDB using GridFS
        file_id = fs.put(file, filename=filename)
        
        # Save file details (including GridFS ObjectId) to MongoDB
        mongo.db.files.insert_one({'filename': filename, 'file_id': file_id})
    
        db.assignments.update_one(
            {"_id":ObjectId(assignment_id)},
            {'$push': {"submissions" : {"filename": filename, "file_id": str(file_id), "student_name": username}}}
        )

        return jsonify({'message': 'File uploaded successfully'}), 200

@app.route('/download/<file_id>', methods=['GET'])
def download_file(file_id):
    try:
        # Retrieve file from GridFS using ObjectId
        file = fs.get(ObjectId(file_id))
        response = jsonify({'message': 'File retrieved successfully'})
        response.data = file.read()
        response.headers['Content-Type'] = 'application/octet-stream'
        response.headers['Content-Disposition'] = f'attachment; filename={file.filename}'
        return response
    except Exception as e:
        return jsonify({'error': f'Error retrieving file: {str(e)}'}), 500

@app.route("/")
def home_page():
    mongo.db.teacher.insert_one({'name' : 'John Doe'})
    return "<p>Hello World!</p>"

# /api/home
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Hello world!",
    })

if __name__ == "__main__":
    app.run(debug=True, port=8000)


# mongodb+srv://divyamahajan5003:ib0fsxO9y7AAzTM4@cluster0.vqvrsmt.mongodb.net/