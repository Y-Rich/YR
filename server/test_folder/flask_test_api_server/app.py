from flask import Flask
# import Vision
import environment
app = Flask(__name__)

environment()

@app.route('/')
def hello_world():
    
    # return Vision
    return "Vision"

if __name__ == '__main__':
    app.run(debug=True, port=5000)