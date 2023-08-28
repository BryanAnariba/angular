# Generated by Django 4.2.4 on 2023-08-28 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_title', models.CharField(max_length=100, verbose_name='Task Name')),
                ('task_description', models.TextField(null=True, verbose_name='Task Description')),
                ('task_done', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Task',
                'verbose_name_plural': 'Tasks',
                'db_table': 'Task',
                'ordering': ['id'],
            },
        ),
    ]