import paho.mqtt.client as mqtt
import json

# MQTT 브로커 설정
mqtt_broker = "192.168.0.44"  # MQTT 브로커 IP 주소 설정
mqtt_port = 1883
mqtt_topic = "edukit/control"  # MQTT 토픽 이름 설정

# MQTT 클라이언트 초기화
client = mqtt.Client("Python_Client")
client.connect(mqtt_broker, mqtt_port)

def generate_json_data(num):
    if num == 0:  
        return None  
    elif 3 <= num <= 5:  
        return {"tagId": "11", "value": "1"}
    elif num == 1 or num == 2 or num == 6: 
        return {"tagId": "11", "value": "0"}

def publish_json_data(topic, data):
    # JSON 데이터를 MQTT 토픽으로 발행
    print(f"Published JSON data to MQTT topic '{topic}': {data}")
    client.publish(topic, json.dumps(data))
