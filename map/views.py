from django.http import HttpResponse
from django.shortcuts import render
import os

def index(request):
    GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
    GOOGLE_ENDPOINT = f'https://maps.googleapis.com/maps/api/js?key={GOOGLE_API_KEY}&callback=initMap'
    return render(request, 'map/index.html', {'GOOGLE_ENDPOINT': GOOGLE_ENDPOINT})
