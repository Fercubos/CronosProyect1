async function sendMessage() {
    var input = document.getElementById('userInput');
    var message = input.value.trim();
    if (message) {
        // Mostrar el mensaje del usuario en la interfaz
        var userMessageElement = document.createElement('div');
        userMessageElement.innerHTML = '<p class="text-muted">User</p><p>Tú: ' + message + '</p>';
        document.getElementById('messageArea').prepend(userMessageElement);
        input.value = ''; // Limpiar el input después de enviar el mensaje

        try {
            // Envío del mensaje al servidor
            const chatResponse = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message })  // Asegúrate de incluir el userId correcto
            });
            console.log("Mensaje enviado:", message);
            console.log("Mensaje recibido:", chatResponse);
            // Procesar la respuesta del servidor
            const data = await chatResponse.json();
            console.log("Respuesta del servidor:", data.response.content);
            if (chatResponse.ok) {
                var serverMessageElement = document.createElement('div');
                serverMessageElement.innerHTML = '<p class="text-muted">Assistant</p><p>Respuesta: ' + data.response.content + '</p>'; // Ajusta según la estructura de tu respuesta
                document.getElementById('messageArea').prepend(serverMessageElement);
            } else {
                console.error('Error en la respuesta del servidor:', data);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    }
}



// Permitir enviar mensajes con la tecla Enter
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
        event.preventDefault(); // Prevenir el comportamiento por defecto de la tecla Enter
    }
});