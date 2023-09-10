import serial
import paho.mqtt.client as mqtt
import json
from time import sleep

# ser = serial.Serial('COM4', 9600)  

# mqtt_broker = "192.168.0.44"  
mqtt_broker = "localhost"  
mqtt_port = 1883  
mqtt_topic = "environment/data"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(mqtt_topic)

def on_publish(client, userdata, mid):
    print("Message Published")

client = mqtt.Client()
client.on_connect = on_connect
client.on_publish = on_publish

client.connect(mqtt_broker, mqtt_port, 60)

while True:
    # data = ser.readline().decode().strip()  # 아두이노로부터 응답 받음
    # print(data)
    
    # humidity, temperature = data.split(',')
    # humidity = humidity.split(':')[1].strip() 
    # temperature = temperature.split(':')[1].strip() 
    
    payload = {
        # "Humidity": humidity,
        # "Temperature": temperature,
        "Humidity": 30,
        "Temperature": 60,
    
    }
    json_data = json.dumps(payload)
    
    client.publish(mqtt_topic, json_data)
    sleep(1)

client.loop_forever()