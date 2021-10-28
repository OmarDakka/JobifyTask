from django.db import models

# Create your models here.


class Category(models.Model):
    title = models.CharField(blank=False, max_length=255)


class Product(models.Model):
    title = models.CharField(blank=False, max_length=255)
    description = models.CharField(blank=False, max_length=255)
    category = models.ManyToManyField(
        Category, related_name="product_category")
    price = models.FloatField(blank=False)
    image = models.CharField(blank=False, max_length=255)
    available_quantity = models.IntegerField(blank=False)
