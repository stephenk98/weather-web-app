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
