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

# @app.route("/search", methods=["POST"])
# @cross_origin() # Remove in production
# def search():
#     print('helloooo')
#     # cursor = cnx.cursor(dictionary=True)
#     # # cursor.execute(""" INSERT INTO QUERY VALUES(%s,%s)""", (test1, test2))
#     # cnx.close()
#     return {"status": "SUCCESS", "message": "test message"}

@app.route('/', defaults = {"path": ""})
def test(path):
    return "This is the Flask Root Directory. Go to http://localhost:3000"

@app.route('/registerUser', methods = ["POST"])
@cross_origin()
def registerUser():
    cursor = cnx.cursor(dictionary=True)
    data = request.get_json()

    cursor.execute("SELECT * FROM Users WHERE username = %s", (data["username"],))
    result = cursor.fetchall()

    if len(result) > 0:
        print("username already exists")
        return {"status": "FAILURE", "message": "test message"}
    else:
        cursor.execute(""" INSERT INTO Users (username, password, email, NHSID, postcode) VALUES (%s,%s,%s,%s,%s)""", (data['username'], bcrypt.generate_password_hash(data['password']).decode('utf-8'), data['email'], data['NHSID'], data['postcode']))
        cnx.commit()

        cursor.close()
        print("created new user")
        return {"status": "SUCCESS", "message": "test message"}

@app.route('/loginUser', methods = ["POST"])
@cross_origin()
def loginUser():
    cursor = cnx.cursor(dictionary=True)
    data = request.get_json()

    cursor.execute("SELECT * FROM Users WHERE username = %s", (data['username'],))
    result = cursor.fetchall()
    print(result)

    password_valid = bcrypt.check_password_hash(result[0]['password'], data['password'])
    cursor.close()

    if password_valid:
        print("valid password")
        return {"status": "SUCCESS", "message": "test message"}
    else:
        print("incorrect password")
        return {"status": "FAILURE", "message": "test message"}


@app.route("/sendReport", methods=["POST"])
@cross_origin()
def sendReport():
    cursor = cnx.cursor(dictionary=True)
    data = request.get_json()

    cursor.execute("SELECT * FROM Diseases WHERE diseaseName = %s", (data["diseaseName"],))
    result = cursor.fetchall()
    print(result)

    if len(result) > 0:
        pass
    else:        
        cursor.execute(""" INSERT INTO Diseases (diseaseID) VALUES (%s) """, (data['diseaseName'], ))
        cnx.commit()

    cursor.execute(""" INSERT INTO UsersDiseased (userID, diseaseID) VALUES ((SELECT userID FROM Users WHERE username = %s),(SELECT diseaseID from Diseases WHERE diseaseName = %s))""", (data['username'], data["diseaseName"]))
    cnx.commit()

    cursor.close()
    print("user disease added")
    return {"status": "SUCCESS", "message": "test message"}


if __name__ == "__main__":
    app.run(debug = True, host = "localhost", port = os.getenv("REACT_APP_FLASK_PORT"))
