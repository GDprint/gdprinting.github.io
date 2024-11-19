from flask import Flask, request, send_file
from PIL import Image, ImageDraw
import io

app = Flask(__name__)

@app.route('/generate-file', methods=['POST'])
def generate_file():
    data = request.json
    width_cm = int(data['width'])
    height_cm = int(data['height'])
    description = data['description']

    # Convert dimensions from cm to pixels (assuming 300 DPI)
    width_px = int(width_cm * 118.11)  
    height_px = int(height_cm * 118.11)

    # Create CMYK image with specified dimensions
    img = Image.new('CMYK', (width_px, height_px), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.text((50, 50), description, fill=(0, 0, 0, 255))

    # Save image to in-memory file in TIFF format
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='TIFF')
    img_bytes.seek(0)

    return send_file(img_bytes, as_attachment=True, download_name="large_format_print.tiff", mimetype='image/tiff')

if __name__ == '__main__':
    app.run()
