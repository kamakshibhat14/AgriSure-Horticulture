from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

def is_crop_image(image):
    image = image.resize((150, 150))   # faster than 200x200
    pixels = list(image.getdata())

    green_pixels = 0
    yellow_pixels = 0
    brown_pixels = 0

    total_pixels = len(pixels)

    for r, g, b in pixels:

        # GREEN (plants)
        if g > 80 and g > r and g > b:
            green_pixels += 1

        # YELLOW (ripe crops like rice/wheat)
        elif r > 150 and g > 120 and b < 100:
            yellow_pixels += 1

        # BROWN (soil)
        elif r > 100 and g > 60 and b < 80:
            brown_pixels += 1

    green_ratio = green_pixels / total_pixels
    yellow_ratio = yellow_pixels / total_pixels
    brown_ratio = brown_pixels / total_pixels

    print("Green:", green_ratio)
    print("Yellow:", yellow_ratio)
    print("Brown:", brown_ratio)

    # FINAL CONDITION
    if (
        green_ratio > 0.10 or
        yellow_ratio > 0.10 or
        (green_ratio + brown_ratio) > 0.25 or
        (yellow_ratio + brown_ratio) > 0.25
    ):
        return True

    return False

@app.route('/predict', methods=['POST'])   
def check_image():
    file = request.files['file']   
    image = Image.open(io.BytesIO(file.read())).convert("RGB")

    if is_crop_image(image):
        return jsonify({"valid": True})
    else:
        return jsonify({"valid": False})


if __name__ == '__main__':
    app.run(port=5000)