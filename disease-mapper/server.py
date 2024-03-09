import os
from flask import Flask, render_template, request
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import mysql.connector
from flask_cors import CORS, cross_origin

load_dotenv()
app = Flask(__name__)
bcrypt = Bcrypt(app)

# MySQL setup
config = {
    "user": "root",
    "password": os.getenv("REACT_APP_MYSQL_PASSWORD"),
    "host": "localhost",
    "unix_socket": os.getenv("REACT_APP_UNIX_SOCKET"),
    "database": "disease_mapper_db",
    "raise_on_warnings": True,
}

# Remove in production. This is for dev (same origin server) only.
app.config["CORS_HEADERS"] = "Content-Type"
cors = CORS(app)

cnx = mysql.connector.connect(**config)

@app.route("/search", methods=["POST"])
@cross_origin() # Remove in production
def search():
    print('helloooo')
    # cursor = cnx.cursor(dictionary=True)
    # # cursor.execute(""" INSERT INTO QUERY VALUES(%s,%s)""", (test1, test2))
    # cnx.close()
    return {"status": "SUCCESS", "message": "test message"}

@app.route('/', defaults = {"path": ""})
def test(path):
    return "This is the Flask Root Directory. Go to http://localhost:3000"

@app.route('/registerUser', methods = ["POST"])
@cross_origin()
def registerUser():
    cursor = cnx.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute(""" INSERT INTO USERS (username, password, email, NHSID, postcode) VALUES (%s,%s,%s,%s,%s)""", (data['username'], bcrypt.generate_password_hash(data['password']).decode('utf-8'), data['email'], data['NHSID'], data['postcode']))
    cnx.commit()
    cursor.close()
    return {"status": "SUCCESS", "message": "test message"}


if __name__ == "__main__":
    app.run(debug = True, host = "localhost", port = os.getenv("REACT_APP_FLASK_PORT"))
