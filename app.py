from flask import Flask, request
from flask_cors import CORS
from weather import get_reverse_geocode, get_location_geocode, get_current_weather, get_past_week_weather

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