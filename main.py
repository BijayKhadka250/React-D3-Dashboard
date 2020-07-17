from flask import Flask, render_template, jsonify
from flask_mysqldb import MySQL
from flask import request
from flask_cors import CORS

app = Flask(__name__)
app.config['MYSQL_USER'] = ''
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_HOST'] = ''
app.config['MYSQL_DB'] = ''
app.config['MYSQL_CURSORCLASS'] = ''
CORS(app)
mysql = MySQL(app)

@app.route('/api')
def session_api():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    return jsonify(data)


@app.route('/multiplecountry',methods = ['POST'])
def fetch_by_multiplecountry():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(citizenship, %s) \
              GROUP BY gender"
    country = request.form.get('country')
    print(country)  
    countries = (request.form.get('country'),)
    print(countries)
    select = select.format('NOT' if country=='any' else '')	
    
    cur.execute(select, (countries))
    response = cur.fetchall()
    return jsonify(response)



@app.route('/country')
def fetch_countries():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT citizenship FROM countries";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/faculties')
def fetch_feculties():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT faculty FROM demographic";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/genders',  methods = ['POST'])
def get_genders():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count \
              FROM demographic \
              WHERE \
              FIND_IN_SET(gender, %s) \
              AND FIND_IN_SET(faculty, %s) \
              AND FIND_IN_SET(citizenship, %s) \
              AND FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND FIND_IN_SET(level, %s) \
              GROUP BY gender"
#    params = (request.form.get('gender'),request.form.get('faculty'),request.form.get('country'),request.form.get('year'),request.form.get('level'),)	
    countries = request.form.get('country')
    print(countries)
    genders = request.form.get('gender')
    print(genders)
    levels = request.form.get('level')
    print(levels)
    years = request.form.get('year')
    print(years)#
    faculties = request.form.get('faculty')
    print(faculties)

    select = select.format('NOT' if genders=='any' else '',\
                           'NOT' if faculties=='any' else '',\
                           'NOT' if countries=='any' else '',\
                           'NOT' if years=='any' else '',\
                           'NOT' if levels=='any' else '')
    #print(genders)
    cur.execute(select, (genders,faculties,countries,years,levels))
    #print(cur._executed)
#    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/ages',methods = ['POST'])
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

    print(country)  
    print(gender)
    print(level)
    print(year)
    print(faculty)
    countries = (request.form.get('country'),)
    print(countries)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender=='any' else '',\
			   'NOT' if faculty=='any' else '',\
                           'NOT' if country=='any' else '',\
                           'NOT' if year=='any' else '',\
                           'NOT' if level=='any' else '')
	
    
    cur.execute(select, (genders,faculties,countries,years,levels))
    response = cur.fetchall()
    return jsonify(response)



if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host = '0.0.0.0', port=4545)
