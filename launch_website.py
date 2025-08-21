import http.server
import socketserver
import webbrowser
import os
import threading
import time
import urllib.parse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Parse the path
        parsed_path = urllib.parse.urlparse(path)
        path = parsed_path.path
        
        # Remove leading slash from path
        if path.startswith('/'):
            path = path[1:]
            
        # Map the root path to index.html
        if path == '':
            path = 'index.html'
        
        # Special handling for /dist/ paths
        if path.startswith('dist/'):
            # Map to www.russellreynolds.com/dist/
            path = os.path.join('www.russellreynolds.com', path)
            
        # Join with the current directory
        result = os.path.join(os.getcwd(), path)
        return result

def open_browser():
    # Wait a moment for the server to start
    time.sleep(1)
    # Open the browser to the launcher page
    webbrowser.open('http://localhost:8000')

# Change to the directory of this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Start the browser in a separate thread
threading.Thread(target=open_browser).start()

# Set up the server
PORT = 8000
Handler = CustomHTTPRequestHandler

print(f"Starting web server at http://localhost:{PORT}")
print("Press Ctrl+C to stop the server")

# Start the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")