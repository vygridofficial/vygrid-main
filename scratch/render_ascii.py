import os
from PIL import Image

path = r"c:\Users\MADHAV MP\Desktop\VYGRID OFFICIAL FILES\vygrid-main\scratch\downloaded_thumbs\gateway_kitchen.png"
if os.path.exists(path):
    with Image.open(path) as img:
        # Resize to 80x40 for text display
        img = img.resize((80, 24)).convert("L")
        pixels = img.getdata()
        chars = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"]
        output = []
        for i in range(24):
            line = "".join(chars[pixels[i*80 + j] * len(chars) // 256] for j in range(80))
            output.append(line)
        print("\n".join(output))
else:
    print("File not found")
