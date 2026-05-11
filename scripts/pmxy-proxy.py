#!/usr/bin/env python3
"""
Local HTTP proxy that intercepts Flash Player requests,
saves responses, and logs all URLs.
"""
import http.server
import socketserver
import urllib.request
import urllib.error
import os
import ssl
from urllib.parse import urlparse
import threading

SAVE_DIR = "/tmp/pmxy-resources-captured"
LOG_FILE = "/tmp/pmxy-proxy-log.txt"
TARGET_HOST = "s1.wan5d.com"

os.makedirs(SAVE_DIR, exist_ok=True)
open(LOG_FILE, 'w').close()  # Clear log

captured_urls = []
lock = threading.Lock()

def save_resource(url, data, content_type=""):
    """Save captured resource to disk"""
    parsed = urlparse(url)
    path = parsed.path.lstrip('/')
    
    if not path:
        return
    
    # Create directory structure
    local_path = os.path.join(SAVE_DIR, path.replace('/', os.sep))
    local_dir = os.path.dirname(local_path)
    
    if not local_dir:
        return
        
    try:
        os.makedirs(local_dir, exist_ok=True)
        
        # Save file
        with open(local_path, 'wb') as f:
            f.write(data)
        
        with lock:
            captured_urls.append(url)
            with open(LOG_FILE, 'a') as f:
                f.write(f"{url}\n")
        
        print(f"  SAVED: {path} ({len(data)} bytes)")
    except Exception as e:
        print(f"  Save error: {e} for {path}")

class ReusableTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        url = self.path
        if not url.startswith('http'):
            url = f"https://{TARGET_HOST}{self.path}"
        
        print(f"REQUEST: {url}")
        
        try:
            req = urllib.request.Request(url)
            req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
            req.add_header('Referer', f'https://{TARGET_HOST}/')
            req.add_header('Accept', '*/*')
            
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            
            resp = urllib.request.urlopen(req, context=ctx, timeout=30)
            data = resp.read()
            content_type = resp.headers.get('Content-Type', '')
            
            save_resource(url, data, content_type)
            
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', len(data))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(data)
            
        except urllib.error.HTTPError as e:
            print(f"  HTTP Error {e.code}: {url}")
            self.send_response(e.code)
            self.end_headers()
            with lock:
                with open(LOG_FILE, 'a') as f:
                    f.write(f"HTTP {e.code}: {url}\n")
        except Exception as e:
            print(f"  Error: {e} for {url}")
            self.send_response(500)
            self.end_headers()

    def log_message(self, format, *args):
        pass

if __name__ == "__main__":
    PORT = 8899
    with ReusableTCPServer(("", PORT), ProxyHandler) as httpd:
        print(f"Proxy running on port {PORT}")
        print(f"Saving resources to {SAVE_DIR}")
        httpd.serve_forever()
