import os
from PIL import Image
import numpy as np

path = r"c:\Users\MADHAV MP\Desktop\VYGRID OFFICIAL FILES\vygrid-main\scratch\downloaded_thumbs\gateway_kitchen.png"
if os.path.exists(path):
    with Image.open(path) as img:
        img_rgb = img.convert("RGB")
        arr = np.array(img_rgb)
        
        # Calculate brightness of each pixel
        brightness = 0.299 * arr[:,:,0] + 0.587 * arr[:,:,1] + 0.114 * arr[:,:,2]
        
        # Count black pixels (brightness < 10)
        black_pixels = np.sum(brightness < 10)
        total_pixels = brightness.size
        print(f"Total pixels: {total_pixels}")
        print(f"Black pixels (brightness < 10): {black_pixels} ({black_pixels/total_pixels*100:.1f}%)")
        print(f"Bright pixels (brightness > 200): {np.sum(brightness > 200)} ({np.sum(brightness > 200)/total_pixels*100:.1f}%)")
        print(f"Medium pixels (10 <= brightness <= 200): {np.sum((brightness >= 10) & (brightness <= 200))} ({np.sum((brightness >= 10) & (brightness <= 200))/total_pixels*100:.1f}%)")
        
        # Let's see if the image has a logo in the center
        # Let's inspect the center 100x100 pixels
        h, w = brightness.shape
        cy, cx = h // 2, w // 2
        center_area = brightness[cy-50:cy+50, cx-50:cx+50]
        print(f"Center area mean brightness: {np.mean(center_area):.1f}")
        print(f"Center area min brightness: {np.min(center_area):.1f}")
        print(f"Center area max brightness: {np.max(center_area):.1f}")
else:
    print("File not found")
