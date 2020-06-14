from celery import Celery
import urllib.request
import os
import time


# Create the app and set the broker location (RabbitMQ)
app = Celery('hello',
             backend='rpc://',
             broker='pyamqp://worker_user:worker_user@localhost/service_vhost')


@app.task(bind=True,serializer='json', name='hello')
def hello(self,id):
    time.sleep(5)
    return id
