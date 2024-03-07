import os
from flask import Flask, render_template, request
from dotenv import load_dotenv
import mysql.connector
from flask_cors import CORS, cross_origin

load_dotenv()
app = Flask(__name__)

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
    # cursor.execute(
    #     """ CREATE TABLE Users (
    #         userID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    #         username varchar(255) NOT NULL,
    #         password varchar(255) NOT NULL,
    #         NHSID varchar(255) NOT NULL,
    #         postcode varchar(255) NOT NULL
    #     )"""
    # )
    # # cursor.execute(""" INSERT INTO QUERY VALUES(%s,%s)""", (test1, test2))
    # cnx.close()
    return {"status": "SUCCESS", "message": "test message"}

@app.route('/', defaults = {"path": ""})
def test(path):
    return "Hello World"

if __name__ == "__main__":
    app.run(debug = True, host = "localhost", port = os.getenv("REACT_APP_FLASK_PORT"))
