# Generated by Django 4.0.2 on 2022-02-08 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_room_freelanceruser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='avatar',
        ),
        migrations.RemoveField(
            model_name='user',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='user',
            name='created',
        ),
        migrations.RemoveField(
            model_name='user',
            name='field1',
        ),
        migrations.RemoveField(
            model_name='user',
            name='field2',
        ),
        migrations.RemoveField(
            model_name='user',
            name='price',
        ),
        migrations.RemoveField(
            model_name='user',
            name='profile_title',
        ),
        migrations.RemoveField(
            model_name='user',
            name='rating',
        ),
        migrations.RemoveField(
            model_name='user',
            name='updated',
        ),
    ]
