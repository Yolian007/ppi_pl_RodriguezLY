import streamlit as st
import time

# Título y autor
st.title("Temporizador")
st.write("Esta app fue elaborada por Linder Rodriguez.")

# Selector de alimento
alimento = st.selectbox("Selecciona un alimento:", ["Carne", "Pollo", "Otro"])

# Selector de tiempo en minutos
tiempo_deseado_minutos = st.number_input("Ingresa el tiempo deseado en minutos:", min_value=1, step=1)

# Convertir minutos a segundos
tiempo_deseado = tiempo_deseado_minutos * 60

# Mostrar temporizador
temporizador = st.empty()
for i in range(tiempo_deseado, 0, -1):
    minutos_restantes = i // 60
    segundos_restantes = i % 60
    temporizador.write(f"Tiempo restante: {minutos_restantes} minutos {segundos_restantes} segundos")
    time.sleep(1)

# Ejecutar JavaScript para reproducir el sonido
st.write('<script type="text/javascript">new Audio("https://www.soundjay.com/button/beep-07.wav").play();</script>', unsafe_allow_html=True)

temporizador.write("¡Listo!")
