# Generated by Django 4.2.4 on 2023-09-07 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timeline', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statusupdate',
            name='media',
        ),
        migrations.AddField(
            model_name='statusupdate',
            name='medias',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='statusupdate',
            name='text',
            field=models.TextField(blank=True),
        ),
    ]
