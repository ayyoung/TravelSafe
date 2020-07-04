from django.http import HttpResponse
from django.shortcuts import render
import os
import datetime
import math
import pandas as pd
from .models import Report

def index(request):
    GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
    GOOGLE_ENDPOINT = f'https://maps.googleapis.com/maps/api/js?key={GOOGLE_API_KEY}&callback=initMap'
    time_range = 2*365
    today = datetime.datetime.today()
    reps = pd.read_json("https://data.cityofchicago.org/resource/6zsd-86xi.json?")
    types = ['BATTERY', 'CRIMINAL DAMAGE', 'ROBBERY', 'THEFT', 'ASSAULT', 'SEX OFFENSE', 'CRIM SEXUAL ASSAULT', 'BURGLARY', 'NARCOTICS','HOMIDICDE']
    risk_crimes = []
    for i, curr_crime in reps.iterrows():
        if curr_crime.primary_type in types:
            diff = (today - curr_crime.date).days
            if diff < time_range and not math.isnan(curr_crime.longitude):
                r = Report(longitude=curr_crime.longitude, lattitude=curr_crime.latitude, date=curr_crime.date, crime_type=curr_crime.primary_type)
                risk_crimes.append(r)
    context = {'reps': risk_crimes, 'GOOGLE_ENDPOINT': GOOGLE_ENDPOINT }
    return render(request, 'map/index.html', context)
