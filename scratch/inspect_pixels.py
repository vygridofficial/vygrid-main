import os
from PIL import Image

path = r"c:\Users\MADHAV MP\Desktop\VYGRID OFFICIAL FILES\vygrid-main\scratch\downloaded_thumbs\gateway_kitchen.png"
if os.path.exists(path):
    with Image.open(path) as img:
        print("Image mode:", img.mode)
        # Check unique colors in the image
        colors = img.getcolors(maxcolors=256)
        if colors:
            print("Unique colors count:", len(colors))
        else:
            print("More than 256 unique colors")
        
        # Let's get the bounding box of non-black/non-transparent pixels
        # Or print min/max values for R, G, B channels
        extrema = img.getextrema()
        print("Extrema (min, max) per channel:")
        channels = ['R', 'G', 'B', 'A'] if img.mode == 'RGBA' else ['R', 'G', 'B']
        for name, ext in zip(channels, extrema):
            print(f"Channel {name}: {ext}")
else:
    print("File not found")
