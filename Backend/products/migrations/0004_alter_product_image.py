# Generated by Django 3.2.8 on 2021-10-29 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20211029_1407'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='default.png', upload_to=''),
        ),
    ]
