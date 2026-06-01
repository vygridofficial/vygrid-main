import os
from PIL import Image

dir_path = r"c:\Users\MADHAV MP\Desktop\VYGRID OFFICIAL FILES\vygrid-main\scratch\downloaded_thumbs"
images = ["property_express.jpg", "decorio.jpg"]

for img_name in images:
    path = os.path.join(dir_path, img_name)
    if os.path.exists(path):
        print(f"\n--- ASCII for {img_name} ---")
        with Image.open(path) as img:
            img = img.resize((80, 24)).convert("L")
            pixels = img.getdata()
            chars = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"]
            output = []
            for i in range(24):
                line = "".join(chars[pixels[i*80 + j] * len(chars) // 256] for j in range(80))
                output.append(line)
            print("\n".join(output))
