#!/bin/bash

# Configuración
BASE_URL="http://127.0.0.1:8080/api"
# USERNAME="obijuan"
# PASSWORD="1234567890"

USERNAME="admin"
PASSWORD="Secreto_123"

# Registrar usuario
echo "Registro usuario..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/register" \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\", \"email\": \"$USERNAME@sincorreo.com\"}")

echo "Respuesta del backend: $REGISTER_RESPONSE"

# Iniciar sesión y obtener token
echo "Iniciando sesión, obteniendo token de acceso..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")

ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token')

if [ "$ACCESS_TOKEN" == "null" ] || [ -z "$ACCESS_TOKEN" ]; then
    echo "\t Error: No se pudo obtener el token de acceso."
    exit 1
fi

echo "\t Token obtenido: $ACCESS_TOKEN"

# Acceso al endpoint protegido lista de instalaciones
echo "Accediendo al endpoint protegido..."
PROTECTED_RESPONSE=$(curl -s -X GET "$BASE_URL/instalacion" \
    -H "Authorization: Bearer $ACCESS_TOKEN")

echo "\t Listado de instalaciones: $PROTECTED_RESPONSE"
