# -*- coding: utf-8 -*-
"""
Created on Tue May 12 14:29:31 2020

@author: arunr
"""

from flask import Flask, render_template, jsonify
from flask_mysqldb import MySQL
from flask import request
from flask_cors import CORS

app = Flask(__name__)
app.config['MYSQL_USER'] = 'dataman'
app.config['MYSQL_PASSWORD'] = 'preparedDATA20'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_DB'] = 'students'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
CORS(app)
mysql = MySQL(app)


@app.route('/')
def main():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    cur.close
    return render_template('index.html')

@app.route('/bubble chart')
def graph1():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    print(data)
    cur.close
    return render_template('bubble3.html')


@app.route('/Geo choropleth')
def graph2():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    print(data)
    cur.close
    return render_template('geoChoropleth-world.html')

@app.route('/Bar_chart')
def graph3():
    return render_template('barchart.html')

@app.route('/api')
def session_api():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    return jsonify(data)

@app.route('/country')
def fetch_countries():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT citizenship FROM countries";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/country/genders',  methods = ['POST'])
def fetch_genders_by_country():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND citizenship = %s  GROUP BY gender"
    params = (request.form.get('country'),)
    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/level')
def fetch_level_by_country():
    cur = mysql.connection.cursor()
    select = "SELECT * FROM demographic";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/students')
def fetch_students_by_Years():
    cur = mysql.connection.cursor()
    select = "SELECT * FROM demographic";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


	


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host = '0.0.0.0')
