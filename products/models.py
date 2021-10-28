from django.db import models

# Create your models here.


class Product(models.Model):
    title = models.CharField(blank=False, max_length=255)
    description = models.CharField(blank=False, max_length=255)

    price = models.FloatField(blank=False)
    image = models.CharField(blank=False, max_length=255)
    available_quantity = models.IntegerField(blank=False)


class Category(models.Model):
    title = models.CharField(blank=False, max_length=255)
    product = models.ManyToManyField(Product, related_name="product_category")
