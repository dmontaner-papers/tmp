import http.server
import socketserver
import os

PORT = 8001
DIRECTORY = "/home/dmontaner/code/2025/dominik_2/docs"  # folder to serve

os.chdir(DIRECTORY)

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving {DIRECTORY} at http://localhost:{PORT}")
    httpd.serve_forever()
