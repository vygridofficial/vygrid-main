import os
from PIL import Image

dir_path = r"c:\Users\MADHAV MP\Desktop\VYGRID OFFICIAL FILES\vygrid-main\scratch\downloaded_thumbs"
images = ["property_express.jpg", "gateway_kitchen.png", "rexon_interiors.png", "decorio.jpg"]

for img_name in images:
    path = os.path.join(dir_path, img_name)
    if not os.path.exists(path):
        print(f"{img_name} does not exist!")
        continue
    try:
        with Image.open(path) as img:
            print(f"\nImage: {img_name}")
            print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
            
            # Check transparency
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                print("Has transparency channel/palette.")
                # Get channel data
                rgba = img.convert("RGBA")
                datas = rgba.getdata()
                
                # Check for transparent pixels
                transparent_pixels = 0
                non_transparent_pixels = 0
                r_sum, g_sum, b_sum = 0, 0, 0
                
                for item in datas:
                    if item[3] == 0:  # Alpha is 0
                        transparent_pixels += 1
                    else:
                        non_transparent_pixels += 1
                        r_sum += item[0]
                        g_sum += item[1]
                        b_sum += item[2]
                
                total = len(datas)
                print(f"Transparent pixels: {transparent_pixels} ({transparent_pixels/total*100:.1f}%)")
                print(f"Non-transparent pixels: {non_transparent_pixels} ({non_transparent_pixels/total*100:.1f}%)")
                if non_transparent_pixels > 0:
                    r_avg = r_sum / non_transparent_pixels
                    g_avg = g_sum / non_transparent_pixels
                    b_avg = b_sum / non_transparent_pixels
                    print(f"Average color of non-transparent part (RGB): ({r_avg:.1f}, {g_avg:.1f}, {b_avg:.1f})")
            else:
                print("Does not have transparency.")
                # Get average color
                rgb = img.convert("RGB")
                datas = rgb.getdata()
                r_sum = sum(item[0] for item in datas)
                g_sum = sum(item[1] for item in datas)
                b_sum = sum(item[2] for item in datas)
                total = len(datas)
                print(f"Average color (RGB): ({r_sum/total:.1f}, {g_sum/total:.1f}, {b_sum/total:.1f})")
    except Exception as e:
        print(f"Error processing {img_name}: {e}")
