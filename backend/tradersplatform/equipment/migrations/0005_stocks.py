# Generated by Django 2.2.6 on 2019-11-08 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment', '0004_auto_20191108_0815'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stocks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GOOGL', models.CharField(blank=True, max_length=300, null=True)),
                ('AAPL', models.CharField(max_length=300)),
                ('GM', models.CharField(max_length=300)),
            ],
        ),
    ]
