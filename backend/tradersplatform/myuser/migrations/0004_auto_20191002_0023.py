# Generated by Django 2.2.6 on 2019-10-02 00:23

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myuser', '0003_auto_20191002_0022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='templateuser',
            name='iban_number',
            field=models.BigIntegerField(blank=True, default=None, null=True, validators=[django.core.validators.MinValueValidator(1000000000000000), django.core.validators.MaxValueValidator(9999999999999999)]),
        ),
        migrations.AlterField(
            model_name='templateuser',
            name='phone_number',
            field=models.BigIntegerField(blank=True, default=None, validators=[django.core.validators.MinValueValidator(1000000), django.core.validators.MaxValueValidator(9999999999)]),
        ),
    ]
