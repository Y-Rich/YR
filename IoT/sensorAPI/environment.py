import serial
import paho.mqtt.client as mqtt
import json

ser = serial.Serial('COM3', 9600)  

mqtt_broker = "192.168.0.44"
mqtt_port = 1883  
mqtt_topic = "edukit1/environment/data"

def on_connect(client, userdata, flags, rc):
    print("[environment] Connected with result code "+str(rc))
    client.subscribe(mqtt_topic)

def on_publish(client, userdata, mid):
    print("[environment] Message Published")

client = mqtt.Client()
client.on_connect = on_connect
client.on_publish = on_publish

client.connect(mqtt_broker, mqtt_port, 60)

while True:
    data = ser.readline().decode().strip()  # 아두이노로부터 응답 받음
    print(data)
    
    humidity, temperature, particulate = data.split(',')
    humidity = humidity.split(':')[1].strip() 
    temperature = temperature.split(':')[1].strip() 
    particulate = particulate.split(':')[1].strip()

    payload = {
        "Humidity": humidity,
        "Temperature": temperature,
        "Particulate": particulate,
    }
    json_data = json.dumps(payload)
    
    client.publish(mqtt_topic, json_data)
