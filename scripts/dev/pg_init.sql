DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
       CREATE ROLE admin WITH
           LOGIN
           SUPERUSER
           CREATEDB
           CREATEROLE
           INHERIT
           REPLICATION
           CONNECTION LIMIT -1
           PASSWORD 'admin@123';
       GRANT pg_execute_server_program, pg_monitor, pg_read_all_settings, pg_read_all_stats, pg_read_server_files, pg_signal_backend TO admin;
   END IF;
END
$do$;

SELECT 'CREATE DATABASE matrix
    WITH
    OWNER = admin
    ENCODING = ''UTF8''
    CONNECTION LIMIT = -1;'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'matrix')\gexec
