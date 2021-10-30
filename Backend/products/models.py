from django.db import models
from django.db.models.deletion import CASCADE
from users.models import ExtendUser
# Create your models here.


class Category(models.Model):
    title = models.CharField(blank=False, max_length=255)
    created_at = models.DateTimeField(auto_now=True)


class Product(models.Model):
    title = models.CharField(blank=False, max_length=255)
    description = models.CharField(blank=False, max_length=255)
    category = models.ManyToManyField(
        Category, related_name="product_category")
    price = models.FloatField(blank=False)
    image = models.ImageField(default="default.png",blank= True)
    uploaded_by = models.ForeignKey(ExtendUser,related_name="product_owner",on_delete=CASCADE,default="")
    available_quantity = models.IntegerField(blank=False)
    created_at = models.DateTimeField(auto_now=True)

