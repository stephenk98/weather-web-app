from flask import Flask, request
from flask_cors import CORS
# from weather import get_reverse_geocode, get_location_geocode, get_current_weather, get_past_week_weather

import requests
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

open_weather_api_key = os.environ.get('OPENWEATHER_API_KEY')

def get_reverse_geocode(lat, lon):
    resp = requests.get(f"http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={open_weather_api_key}")
    resp_data = resp.json()[0]
    return {
        'lat': resp_data.get('lat'),
        'lon': resp_data.get('lon'),
        'name': resp_data.get('name'),
        'state': resp_data.get('state'),
        'country': resp_data.get('country')
    }

def get_location_geocode(city, state, country):
    query_string = ','.join([x for x in [city, state, country] if x and x != ''])
    resp = requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q={query_string}&appid={open_weather_api_key}")
    resp_data = resp.json()[0]
    return {
        'lat': resp_data.get('lat'),
        'lon': resp_data.get('lon'),
        'name': resp_data.get('name'),
        'state': resp_data.get('state'),
        'country': resp_data.get('country')
    }

def get_current_weather(lat, lon):
    resp = requests.get(f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={open_weather_api_key}&exclude=minutely")
    resp_data = resp.json()
    return resp_data

def get_past_week_weather(lat, lon):
    past_week_weather = []
    for i in range(7, 0, -1):
        date = (datetime.today() - timedelta(days=i))
        unix_timestamp = str(int(date.timestamp()))
        resp = requests.get(f"https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={unix_timestamp}&appid={open_weather_api_key}&exclude=minutely")
        past_week_weather.append(resp.json()['data'][0])
    return past_week_weather


app = Flask(__name__, static_folder='./client/build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/reverse_geocode', methods=['POST'])
def reverse_geocode():
    data = None
    if request.method == 'POST':
        request_data = request.get_json()
        lat = request_data.get('lat')
        lon = request_data.get('lon')
        data = get_reverse_geocode(lat, lon)
    return data

@app.route('/geocode_location', methods=['POST'])
def geocode_location():
    data = None
    if request.method == 'POST':
        request_data = request.get_json()
        city = request_data.get('city')
        state = request_data.get('state')
        country = request_data.get('country')
        data = get_location_geocode(city, state, country)
    return data

@app.route('/current_weather', methods=['POST'])
def current_weather():
    data = None
    if request.method == 'POST':
        request_data = request.get_json()
        lat = request_data.get('lat')
        lon = request_data.get('lon')
        data = get_current_weather(lat, lon)
    return data

@app.route('/last_week_weather', methods=['POST'])
def last_week_weather():
    data = None
    if request.method == 'POST':
        request_data = request.get_json()
        lat = request_data.get('lat')
        lon = request_data.get('lon')
        data = get_past_week_weather(lat, lon)
    return data

if __name__ == '__main__':
    app.run(debug=True)