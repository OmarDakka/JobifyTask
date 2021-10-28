from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(blank=False,max_length=255)
    email = models.EmailField(blank=False,max_length=255)
    password = models.CharField(blank=False,max_length=255)
    