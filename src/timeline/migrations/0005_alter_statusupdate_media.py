# Generated by Django 4.2.4 on 2023-09-02 00:01

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timeline', '0004_remove_statusupdate_medias_statusupdate_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='statusupdate',
            name='media',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='media'),
        ),
    ]
