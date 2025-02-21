import base64
import io
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import numpy as np
from PIL import Image

class MLModel:
    def __init__(self):
        # In a real application, you would:
        # 1. Load a pre-trained model (e.g., TensorFlow, PyTorch, or scikit-learn)
        # 2. Load model weights
        # 3. Initialize any necessary preprocessing
        pass

    def preprocess_image(self, image_data):
        # Convert base64 to image
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Resize image to standard size
        image = image.resize((224, 224))
        
        # Convert to numpy array and normalize
        img_array = np.array(image)
        img_array = img_array / 255.0
        
        return img_array

    def predict(self, image_array):
        # Simulate ML model prediction
        # In reality, you would:
        # 1. Pass the preprocessed image through your model
        # 2. Get probability scores for each class
        # 3. Process the model's output
        
        # Simulated conditions with varying probabilities
        conditions = [
            {
                "name": "Atopic Dermatitis",
                "description": "A chronic inflammatory skin condition characterized by dry, itchy skin",
                "confidence": round(np.random.uniform(85, 95), 1),
                "symptoms": ["Dry skin", "Itching", "Redness", "Inflammation"],
                "recommendations": [
                    "Use moisturizing creams",
                    "Avoid harsh soaps",
                    "Apply prescribed topical medications",
                    "Identify and avoid triggers"
                ],
                "severity": "moderate"
            },
            {
                "name": "Psoriasis",
                "description": "An autoimmune condition causing rapid skin cell growth and scaling",
                "confidence": round(np.random.uniform(80, 90), 1),
                "symptoms": ["Thick red patches", "Silvery scales", "Itching", "Burning"],
                "recommendations": [
                    "Use prescribed topical treatments",
                    "Consider phototherapy",
                    "Maintain skin moisture",
                    "Avoid skin injury"
                ],
                "severity": "severe"
            },
            {
                "name": "Contact Dermatitis",
                "description": "Skin inflammation caused by direct contact with an irritant or allergen",
                "confidence": round(np.random.uniform(75, 85), 1),
                "symptoms": ["Redness", "Itching", "Burning", "Skin rash"],
                "recommendations": [
                    "Identify and avoid triggers",
                    "Use cool compresses",
                    "Apply recommended creams",
                    "Keep skin clean and dry"
                ],
                "severity": "mild"
            }
        ]
        
        # Return 1-2 random conditions as prediction
        return sorted(conditions, key=lambda x: x["confidence"], reverse=True)[:np.random.randint(1, 3)]

class RequestHandler(BaseHTTPRequestHandler):
    model = MLModel()
    
    def do_POST(self):
        if self.path == '/api/analyze':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            try:
                # Process the image
                image_array = self.model.preprocess_image(data['image'])
                
                # Get predictions
                predictions = self.model.predict(image_array)
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(predictions).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()