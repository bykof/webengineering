# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-06-17 16:27
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20170617_1724'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='frontend_game_indexes',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=[]),
            preserve_default=False,
        ),
    ]
