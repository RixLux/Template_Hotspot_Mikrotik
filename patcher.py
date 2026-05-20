import os
import shutil
import sys
import argparse

# Configuration
HOTSPOT_DIR = 'hotspot'
FILES_TO_PATCH = [
    'login.html', 'logout.html', 'status.html', 
    'error.html', 'alogin.html', 'radvert.html'
]
CSS_FILE = 'login.css'
OFFLINE_ASSETS_DIR = 'offline_patch'

# Replacements
CDN_FA = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
LOCAL_FA = 'css/all.min.css'

CDN_POPPINS = "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');"
LOCAL_POPPINS = """@font-face {
    font-family: 'Poppins';
    src: url('fonts/Poppins-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}"""

def patch_to_offline():
    print("Switching to OFFLINE mode...")
    
    # 1. Copy assets from offline_patch to hotspot
    if os.path.exists(OFFLINE_ASSETS_DIR):
        for item in os.listdir(OFFLINE_ASSETS_DIR):
            s = os.path.join(OFFLINE_ASSETS_DIR, item)
            d = os.path.join(HOTSPOT_DIR, item)
            if os.path.isdir(s):
                if os.path.exists(d):
                    shutil.rmtree(d)
                shutil.copytree(s, d)
                print(f"  - Copied directory: {item} to {HOTSPOT_DIR}")
            else:
                shutil.copy2(s, d)
                print(f"  - Copied file: {item} to {HOTSPOT_DIR}")
    else:
        print(f"Error: {OFFLINE_ASSETS_DIR} folder not found!")
        return

    # 2. Patch HTML files
    for filename in FILES_TO_PATCH:
        filepath = os.path.join(HOTSPOT_DIR, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace(CDN_FA, LOCAL_FA)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  - Patched {filepath}")

    # 3. Patch CSS file
    css_path = os.path.join(HOTSPOT_DIR, CSS_FILE)
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content.replace(CDN_POPPINS, LOCAL_POPPINS)
        
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  - Patched {css_path}")

def patch_to_online():
    print("Switching to ONLINE mode...")
    
    # 1. Patch HTML files
    for filename in FILES_TO_PATCH:
        filepath = os.path.join(HOTSPOT_DIR, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace(LOCAL_FA, CDN_FA)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  - Patched {filepath}")

    # 2. Patch CSS file
    css_path = os.path.join(HOTSPOT_DIR, CSS_FILE)
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content.replace(LOCAL_POPPINS, CDN_POPPINS)
        
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  - Patched {css_path}")
    
    # 3. Remove local assets from hotspot
    if os.path.exists(OFFLINE_ASSETS_DIR):
        for item in os.listdir(OFFLINE_ASSETS_DIR):
            target = os.path.join(HOTSPOT_DIR, item)
            if os.path.exists(target):
                if os.path.isdir(target):
                    shutil.rmtree(target)
                    print(f"  - Removed directory: {item} from {HOTSPOT_DIR}")
                else:
                    os.remove(target)
                    print(f"  - Removed file: {item} from {HOTSPOT_DIR}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Patch Luxia Hotspot Template for Online/Offline mode.')
    parser.add_argument('mode', choices=['online', 'offline'], help='The mode to switch to.')
    
    args = parser.parse_args()
    
    if args.mode == 'offline':
        patch_to_offline()
    else:
        patch_to_online()
    
    print("\nPatching complete!")
