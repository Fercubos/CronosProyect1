FROM postgres:latest

# Establecer variables de entorno para la configuración inicial de PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=3312
ENV POSTGRES_DB=Proyecto_Cronos1

# Copiar el script de inicialización y el archivo de copia de seguridad
COPY init-db.sh /docker-entrypoint-initdb.d/
COPY backup.sql /docker-entrypoint-initdb.d/

# Exponer el puerto (opcional, ya que se expone por defecto en la imagen base)
EXPOSE 5432
