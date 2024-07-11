from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/cafes', methods=['GET'])
def get_cafes():
    lat = request.args.get('lat')
    lng = request.args.get('lng')