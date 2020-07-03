from django.db import models

class Report(models.Model):
    date = models.DateTimeField('date')
    longitude = models.DecimalField(max_digits=7, decimal_places=5)
    lattitude = models.DecimalField(max_digits=7, decimal_places=5)
    crime_type = models.TextField(max_length=32) 
