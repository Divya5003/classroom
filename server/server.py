from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
from bson import ObjectId
from pymongo import MongoClient
from gridfs import GridFS
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = str(os.getenv('MONGO_URI'))

# app instance
app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = mongo_uri
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Connect to MongoDB using pymongo for GridFS
client = MongoClient(mongo_uri)
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
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Ensure a secure filename
        filename = secure_filename(file.filename)

        # Save the file to MongoDB using GridFS
        file_id = fs.put(file, filename=filename)

        # Save file details (including GridFS ObjectId) to MongoDB
        mongo.db.files.insert_one({'filename': filename, 'file_id': file_id})

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