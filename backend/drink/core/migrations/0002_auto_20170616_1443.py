# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-06-16 12:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='started',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='party',
            name='entry_code',
            field=models.CharField(blank=True, help_text='Der Entrycode wird immer nach Erstellung der Party neu generiert.', max_length=5),
        ),
    ]
