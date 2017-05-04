# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-04 13:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Party',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('entry_code', models.CharField(max_length=12)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PartyMember',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.TextField()),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Party')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]