import os
from flask import Flask, render_template, request
from dotenv import load_dotenv
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

load_dotenv()
app = Flask(__name__)

# MySQL setup
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "root"
app.config["MYSQL_DB"] = "disease_mapper_db"

# Remove in production. This is for dev (same origin server) only.
app.config["CORS_HEADERS"] = "Content-Type"
cors = CORS(app)

mysql = MySQL(app)


@app.route("/search", methods=["POST"])
@cross_origin() # Remove in production
def search():
    if request.method == "POST":
        data = request.get_json()
        test1 = data["test1"]
        test2 = data["test2"]
        cursor = mysql.connection.cursor()
        cursor.execute(
            """ CREATE TABLE IF NOT EXISTS QUERY(
                test1 CHAR(50) NOT NULL,
                test2 CHAR(50)
            )"""
        )
        cursor.execute(""" INSERT INTO QUERY VALUES(%s,%s)""", (test1, test2))
        mysql.connection.commit()
        cursor.close()
        return {"status": "SUCCESS", "message": "test message"}


@app.route('/', defaults = {"path": ""})
def test(path):
    return "Hello World"

if __name__ == "__main__":
    app.run(debug = True, host = "localhost", port = os.getenv("FLASK_PORT"))
