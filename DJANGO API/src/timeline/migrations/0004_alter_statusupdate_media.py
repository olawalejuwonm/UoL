# Generated by Django 4.2.4 on 2023-09-08 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timeline', '0003_rename_medias_statusupdate_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='statusupdate',
            name='media',
            field=models.URLField(blank=True, null=True),
        ),
    ]
