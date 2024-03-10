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

@app.route('/', defaults = {"path": ""})
def test(path):
    return "This is the Flask Root Directory. Go to http://localhost:3000"

@app.route('/registerUser', methods=["POST"])
@cross_origin()
def registerUser():
    cursor = cnx.cursor(dictionary=True)
    data = request.get_json()

    cursor.execute("SELECT * FROM Users WHERE username = %s", (data["username"],))
    result = cursor.fetchall()

    if len(result) > 0:
        return {"status": "FAILURE", "message": "Username already exists"}, 409

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    cursor.execute("""INSERT INTO Users (username, password, email, nhsID, postcode) VALUES (%s,%s,%s,%s,%s)""",
                   (data['username'], hashed_password, data['email'], data['nhsID'], data['postcode']))
    cnx.commit()
    cursor.close()

    # Mimic login by returning user's details except for the password
    return {
        "status": "SUCCESS",
        "message": "User registered successfully",
        "user": {
            "username": data['username'],
            "email": data['email'],
            "nhsID": data['nhsID'],
            "postcode": data['postcode']
        }
    }


@app.route('/loginUser', methods=["POST"])
@cross_origin()
def loginUser():
    cursor = cnx.cursor(dictionary=True)
    data = request.get_json()

    cursor.execute("SELECT * FROM Users WHERE username = %s", (data['username'],))
    result = cursor.fetchall()

    if not result:
        return {"status": "FAILURE", "message": "User not found"}, 404

    user = result[0]
    password_valid = bcrypt.check_password_hash(user['password'], data['password'])

    if password_valid:
        # Avoid sending the password back
        user.pop('password', None)
        return {"status": "SUCCESS", "message": "Login successful", **user}
    else:
        return {"status": "FAILURE", "message": "Incorrect password"}, 401

@app.route("/sendReport", methods=["POST"])
@cross_origin()
def sendReport():
    cursor = cnx.cursor(dictionary=True)
    data = request.get_json()

    # Check if the disease is already in the database
    cursor.execute("SELECT diseaseID FROM Diseases WHERE diseaseName = %s", (data["diseaseName"],))
    disease = cursor.fetchone()

    if not disease:
        # Add the new disease to the Diseases table
        cursor.execute("INSERT INTO Diseases (diseaseName) VALUES (%s)", (data["diseaseName"],))
        cnx.commit()
        diseaseID = cursor.lastrowid
    else:
        diseaseID = disease['diseaseID']
    
    # Fetch the userID using the username (assumed to be unique)
    cursor.execute("SELECT userID FROM Users WHERE username = %s", (data["username"],))
    user = cursor.fetchone()
    if not user:
        return {"status": "FAILURE", "message": "User not found"}, 404
    
    # Insert into UsersDiseased table
    cursor.execute("INSERT INTO UsersDiseased (userID, diseaseID) VALUES (%s, %s)", (user['userID'], diseaseID))
    cnx.commit()
    
    cursor.close()
    return {"status": "SUCCESS", "message": "Disease reported successfully"}

@app.route("/getDiseaseReports", methods=["GET"])
@cross_origin()
def getDiseaseReports():
    cursor = cnx.cursor(dictionary=True)

    # Assuming you have the necessary data relations and postcodes stored for each user
    query = """
    SELECT Diseases.diseaseName, Users.postcode 
    FROM UsersDiseased
    JOIN Users ON UsersDiseased.userID = Users.userID
    JOIN Diseases ON UsersDiseased.diseaseID = Diseases.diseaseID
    """
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    
    return {"status": "SUCCESS", "data": results}


if __name__ == "__main__":
    app.run(debug = True, host = "localhost", port = os.getenv("REACT_APP_FLASK_PORT"))

