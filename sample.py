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
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    cur.close
    return render_template('index.html')


@app.route('/bubble chart')
def graph1():
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    # print(data)
    cur.close
    return render_template('bubble3.html')


@app.route('/Geo choropleth')
def graph2():
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    # print(data)
    cur.close
    return render_template('geoChoropleth-world.html')


@app.route('/Bar_chart')
def graph3():
    return render_template('barchart.html')


@app.route('/api')
def session_api():
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    return jsonify(data)


@app.route('/countries')
def fetch_countries():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT citizenship FROM countries"
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/students', methods=['POST'])
def fetch_students_by_Years():
    cur = mysql.connection.cursor()
    select = "SELECT SUBSTRING(term,1,4) AS Enroll_Year, COUNT(*) AS total FROM demographic where\
                {0} FIND_IN_SET(gender, %s) \
                AND {1} FIND_IN_SET(faculty, %s) \
                AND {2} FIND_IN_SET(citizenship, %s) \
                AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
                AND {4} FIND_IN_SET(level, %s) \
                GROUP BY  Enroll_Year"

    countries = request.form.get('country')
    genders = request.form.get('gender')
    levels = request.form.get('level')
    years = request.form.get('year')
    faculties = request.form.get('faculty')

    select = select.format('NOT' if genders == 'any' else '',
                        'NOT' if faculties == 'any' else '',
                        'NOT' if countries == 'any' else '',
                        'NOT' if years == 'any' else '',
                        'NOT' if levels == 'any' else '')
    cur.execute(select, (genders, faculties, countries, years, levels))
        # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/faculties')
def fetch_feculties():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT faculty FROM demographic"
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/genders',  methods=['POST'])
def get_genders():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
              AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
              GROUP BY gender"
#    params = (request.form.get('gender'),request.form.get('faculty'),request.form.get('country'),request.form.get('year'),request.form.get('level'),)
    countries = request.form.get('country')
    genders = request.form.get('gender')
    levels = request.form.get('level')
    years = request.form.get('year')
    faculties = request.form.get('faculty')

    select = select.format('NOT' if genders == 'any' else '',
                           'NOT' if faculties == 'any' else '',
                           'NOT' if countries == 'any' else '',
                           'NOT' if years == 'any' else '',
                           'NOT' if levels == 'any' else '')
    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
#    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/ages', methods=['POST'])
def fetch_by_ages():
    cur = mysql.connection.cursor()
    select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60 \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
              "
    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/level', methods=['POST'])
def fetch_by_level():
    cur = mysql.connection.cursor()
    select = "select level, count(level) count\
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
                  group by level"
    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/residency', methods=['POST'])
def fetch_by_residency():
    cur = mysql.connection.cursor()
    select = "select residency, count(residency) count \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
                  group by residency"

    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/pt_ft', methods=['POST'])
def fetch_by_pt_ft():
    cur = mysql.connection.cursor()
    select = "select pt_ft, count(pt_ft) count\
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
            AND pt_ft IS NOT NULL \
                  group by pt_ft"

    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/faculty', methods=['POST'])
def fetch_by_faculty():
    cur = mysql.connection.cursor()
    select = "select faculty, count(faculty) count\
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
                  group by faculty"

    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/totalstudents', methods=['POST'])
def fetch_total_students():
    cur = mysql.connection.cursor()
    select = "select count(*) count\
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s)"

    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/cgpa', methods=['POST'])
def fetch_cgpa():
    cur = mysql.connection.cursor()

    select = "select COUNT(IF(overall_cgpa BETWEEN 0 AND 1,1,null)) AS cgpa0to1,\
                COUNT(IF(overall_cgpa BETWEEN 1 AND 2,1,null)) AS cgpa1to2,\
                COUNT(IF(overall_cgpa BETWEEN 2 AND 3,1,null)) AS cgpa2to3,\
                COUNT(IF(overall_cgpa BETWEEN 3 AND 4,1,null)) AS cgpa3to4,\
                COUNT(IF(overall_cgpa BETWEEN 4 AND 5,1,null)) AS cgpa4to5\
                FROM demographic WHERE\
                {0} FIND_IN_SET(gender, %s) \
	            AND {1} FIND_IN_SET(faculty, %s) \
                AND {2} FIND_IN_SET(citizenship, %s) \
                AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
                AND {4} FIND_IN_SET(level, %s)"

    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/countries/students', methods=['POST'])
def fetch_students_by_countries():
    cur = mysql.connection.cursor()
    select = "select citizenship, count(citizenship) count \
                FROM demographic WHERE\
                {0} FIND_IN_SET(gender, %s) \
	            AND {1} FIND_IN_SET(faculty, %s) \
                AND {2} FIND_IN_SET(citizenship, %s) \
                AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
                AND {4} FIND_IN_SET(level, %s) \
                and citizenship <> 'Canada'\
                group by citizenship order by count desc"

    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    countries = (request.form.get('country'),)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender == 'any' else '',
                           'NOT' if faculty == 'any' else '',
                           'NOT' if country == 'any' else '',
                           'NOT' if year == 'any' else '',
                           'NOT' if level == 'any' else '')

    cur.execute(select, (genders, faculties, countries, years, levels))
    # print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host = '0.0.0.0', port=4545)
