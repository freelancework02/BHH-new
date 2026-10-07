import os
import sys
from PIL import Image

IMAGES_DIR = os.path.join("public", "images")

def convert_image(src_path, dest_path, max_dim=None, is_graphic=False):
    with Image.open(src_path) as img:
        im = img.copy()
        orig_sz = os.path.getsize(src_path)
        orig_w, orig_h = im.size
        orig_mode = im.mode

        # Resize only if exceeding max_dim
        if max_dim and (im.width > max_dim or im.height > max_dim):
            im.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

        has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
        
        if has_alpha:
            im = im.convert('RGBA')
            # For logos/graphics, test both lossless and q=95 to see which is best
            if is_graphic:
                lossless_path = dest_path + '.lossless.tmp'
                lossy_path = dest_path + '.lossy.tmp'
                im.save(lossless_path, 'WEBP', lossless=True, method=6)
                im.save(lossy_path, 'WEBP', quality=95, method=6)
                
                sz_lossless = os.path.getsize(lossless_path)
                sz_lossy = os.path.getsize(lossy_path)
                
                # Pick smaller or lossless if close
                if sz_lossless <= sz_lossy * 1.5:
                    os.replace(lossless_path, dest_path)
                    if os.path.exists(lossy_path):
                        os.remove(lossy_path)
                else:
                    os.replace(lossy_path, dest_path)
                    if os.path.exists(lossless_path):
                        os.remove(lossless_path)
            else:
                # Cutout photo with alpha
                im.save(dest_path, 'WEBP', quality=90, method=6)
        else:
            im = im.convert('RGB')
            im.save(dest_path, 'WEBP', quality=85, method=6)

        new_sz = os.path.getsize(dest_path)
        reduction = (1 - new_sz / orig_sz) * 100 if orig_sz > 0 else 0
        return orig_sz, new_sz, orig_w, orig_h, im.size[0], im.size[1], reduction

def main():
    if not os.path.isdir(IMAGES_DIR):
        print(f"Directory {IMAGES_DIR} not found!")
        return

    files = [f for f in os.listdir(IMAGES_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    print(f"Found {len(files)} images to convert in {IMAGES_DIR}...\n")
    print(f"{'Filename':35} | {'Original':12} | {'WebP Size':10} | {'Dimensions':15} | {'Savings':8}")
    print("-" * 90)

    total_orig = 0
    total_new = 0

    graphics = {
        'Heart only.png', 'Transparent.png', 'Wordings on Side.png',
        'instagram-widget.png', 'logo-heart-icon.png', 'logo-horizontal-official.png',
        'logo-horizontal.png', 'logo-icon-ai.png', 'logo-icon.png',
        'logo-stacked-official.png', 'logo-vertical.png', 'logo_fullcolor.png',
        'social_icon.png'
    }

    large_photos = {
        'image.jpg': 2560,
        'image2.jpg': 2560
    }

    for fname in sorted(files):
        src_path = os.path.join(IMAGES_DIR, fname)
        base, _ = os.path.splitext(fname)
        dest_fname = base + '.webp'
        dest_path = os.path.join(IMAGES_DIR, dest_fname)

        is_graphic = fname in graphics
        max_dim = large_photos.get(fname, None)

        orig_sz, new_sz, ow, oh, nw, nh, reduction = convert_image(
            src_path, dest_path, max_dim=max_dim, is_graphic=is_graphic
        )

        total_orig += orig_sz
        total_new += new_sz

        dim_str = f"{ow}x{oh}" if (ow == nw and oh == nh) else f"{ow}x{oh}->{nw}x{nh}"
        print(f"{dest_fname:35} | {orig_sz/1024:9.1f} KB | {new_sz/1024:7.1f} KB | {dim_str:15} | {reduction:6.1f}%")

    print("-" * 90)
    print(f"TOTAL ORIGINAL SIZE: {total_orig / (1024 * 1024):.2f} MB")
    print(f"TOTAL WEBP SIZE:     {total_new / (1024 * 1024):.2f} MB")
    print(f"TOTAL SAVINGS:       {(total_orig - total_new) / (1024 * 1024):.2f} MB ({(1 - total_new/total_orig)*100:.1f}%)")

if __name__ == '__main__':
    main()
