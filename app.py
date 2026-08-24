import http.server
import socketserver
import json
import sqlite3
import urllib.parse
import os

PORT = 5000
DB_FILE = "skills.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    # Create skills table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            proficiency INTEGER NOT NULL,
            icon TEXT NOT NULL,
            experience TEXT NOT NULL
        )
    ''')
    
    # Create messages table for storing contact inquiries
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert default initial skills if table is empty
    cursor.execute("SELECT COUNT(*) FROM skills")
    if cursor.fetchone()[0] == 0:
        default_skills = [
            ("Python 3 & REST APIs", "Backend", 95, "🐍", "3+ Years"),
            ("JavaScript (ES6+) & WebGL", "Frontend", 94, "🚀", "3+ Years"),
            ("HTML5 & CSS3 Architecture", "Frontend", 96, "⚡", "3+ Years"),
            ("SQLite3 & Relational Schemas", "Backend", 90, "🛢️", "3+ Years"),
            ("React.js & Component Design", "Frontend", 88, "⚛️", "2+ Years"),
            ("Git, GitHub & CI/CD Workflows", "Tools", 92, "🛠️", "3+ Years"),
            ("Glassmorphic UI / UX Design", "Design", 92, "🎨", "3+ Years"),
            ("Netlify & Cloud Deployment", "Tools", 88, "☁️", "2+ Years"),
            ("TypeScript & Interface Systems", "Frontend", 85, "🔷", "2+ Years"),
            ("REST API Microservices", "Backend", 93, "⚙️", "3+ Years"),
            ("Responsive Design & Tokens", "Design", 95, "📱", "3+ Years"),
            ("Linux CLI & Dev Workstation", "Tools", 86, "💻", "2+ Years")
        ]
        cursor.executemany(
            "INSERT INTO skills (name, category, proficiency, icon, experience) VALUES (?, ?, ?, ?, ?)",
            default_skills
        )
        conn.commit()
    conn.close()

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        
        if parsed_path.path == '/api/skills':
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM skills ORDER BY id DESC")
            rows = cursor.fetchall()
            skills = [dict(row) for row in rows]
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(skills).encode('utf-8'))
        elif parsed_path.path == '/api/contact':
            # Retrieve all received client messages from SQLite database
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM messages ORDER BY id DESC")
            rows = cursor.fetchall()
            messages = [dict(row) for row in rows]
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(messages).encode('utf-8'))
        else:
            # Serve static files (index.html, style.css, script.js, profile.jpg)
            super().do_GET()

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        
        if parsed_path.path == '/api/skills':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            name = data.get('name')
            category = data.get('category', 'General')
            proficiency = int(data.get('proficiency', 80))
            icon = data.get('icon', '⚡')
            experience = data.get('experience', '1+ Year')
            
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO skills (name, category, proficiency, icon, experience) VALUES (?, ?, ?, ?, ?)",
                (name, category, proficiency, icon, experience)
            )
            conn.commit()
            new_id = cursor.lastrowid
            conn.close()
            
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {"id": new_id, "name": name, "category": category, "proficiency": proficiency, "icon": icon, "experience": experience}
            self.wfile.write(json.dumps(response).encode('utf-8'))
        elif parsed_path.path == '/api/contact':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            name = data.get('name', 'Anonymous')
            email = data.get('email', '')
            message = data.get('message', '')
            
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
                (name, email, message)
            )
            conn.commit()
            new_id = cursor.lastrowid
            conn.close()
            
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {"success": True, "id": new_id, "name": name, "email": email, "status": "stored_in_sqlite"}
            self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_PUT(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path.startswith('/api/skills/'):
            skill_id = parsed_path.path.split('/')[-1]
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            name = data.get('name')
            category = data.get('category', 'General')
            proficiency = int(data.get('proficiency', 80))
            icon = data.get('icon', '⚡')
            experience = data.get('experience', '1+ Year')
            
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE skills SET name = ?, category = ?, proficiency = ?, icon = ?, experience = ? WHERE id = ?",
                (name, category, proficiency, icon, experience, skill_id)
            )
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {"id": int(skill_id), "name": name, "category": category, "proficiency": proficiency, "icon": icon, "experience": experience}
            self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_DELETE(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path.startswith('/api/skills/'):
            skill_id = parsed_path.path.split('/')[-1]
            try:
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute("DELETE FROM skills WHERE id = ?", (skill_id,))
                conn.commit()
                conn.close()
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

if __name__ == '__main__':
    init_db()
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f"Python Full-Stack Server running at http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        httpd.serve_forever()
