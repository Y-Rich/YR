import cv2
import numpy as np
from socket import *
from time import sleep
import paho.mqtt.client as mqtt

# 교육키트 IP
HOST = '192.168.0.120'
# 교육키트 Port
PORT = 2004
BUFSIZE = 1024
ADDR = (HOST, PORT)

mqtt_broker = "192.168.0.44"
mqtt_port = 1883
mqtt_topic = "edukit1/vision/data"

def on_connect(client, userdata, flags, rc):
    print("[vision] Connected with result code " + str(rc))
    client.subscribe(mqtt_topic)

def on_publish(client, userdata, mid):
    print("[vision] Message Published")

client = mqtt.Client()
client.on_connect = on_connect
client.on_publish = on_publish

client.connect(mqtt_broker, mqtt_port, 60)

cap = cv2.VideoCapture(1)  # 0 or 1

readings = [-1, -1]
display = [0, 0]

Circle_Inertia = 0.6
Gaussian_ksize = (7, 7)
canny_threshold_min = 100
canny_threshold_max = 250

params = cv2.SimpleBlobDetector_Params()
params.filterByInertia = True
params.minInertiaRatio = Circle_Inertia

detector = cv2.SimpleBlobDetector_create(params)

while True:
    ret, frame = cap.read()

    frame_blurred = cv2.GaussianBlur(frame, Gaussian_ksize, 1)
    frame_gray = cv2.cvtColor(frame_blurred, cv2.COLOR_BGR2GRAY)
    frame_canny = cv2.Canny(frame_gray, canny_threshold_min, canny_threshold_max, apertureSize=3, L2gradient=True)

    keypoints = detector.detect(frame_canny)
    num = len(keypoints)
    readings.append(num)

    client.publish(mqtt_topic, num)

    # print(readings)
    if readings[-1] == readings[-2] == readings[-3] == readings[-4] == readings[-5] == readings[-6]:
        im_with_keypoints = cv2.drawKeypoints(frame, keypoints, np.array([]), (0, 0, 255),
                                               cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
        cv2.putText(im_with_keypoints, str(num), (500, 250), cv2.FONT_HERSHEY_SCRIPT_SIMPLEX, 5, (0, 255, 0))
        socketTxData = bytes([76, 83, 73, 83, 45, 88, 71, 84, 0, 0, 0, 0, 160, 51, 0, 0, 22, 0, 0, 0, 88, 0, 2, 0, 0, 0, 1, 0, 8,
                              0, 37, 68, 87, 48, 49, 49, 48, 48, 2, 0, ])
        num_little = num.to_bytes(2, 'little')

        if num != 0:
            print("num is " + str(num))
            try:
                clientSocket = socket(AF_INET, SOCK_STREAM)
                clientSocket.connect(ADDR)
                print('[vision] Connection PLC Success!')
                clientSocket.send(socketTxData + num_little)
                clientSocket.close()

                # # 이미지를 바이트 배열로 변환
                _, im_with_keypoints_bytes = cv2.imencode('.png', im_with_keypoints)
                im_with_keypoints_bytes = im_with_keypoints_bytes.tobytes()

                # # MQTT 메시지로 이미지 publish
                client.publish(mqtt_topic + "/image", im_with_keypoints_bytes)

            except Exception as e:
                print("[vision] Error" + str(e))
        cv2.imwrite("After.png", im_with_keypoints)
        print('[vision] close PLC Success!')
        sleep(1)
