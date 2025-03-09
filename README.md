## 🚀 Endpoints

### 📌 FRASES

**GET** `https://random-quotes-0v69.onrender.com/api/frases`

**Ejemplo de respuesta**

```json
{ "frase": "El éxito es la suma de pequeños esfuerzos repetidos día tras día." }
```

**GET** `https://random-quotes-0v69.onrender.com/api/frases?categoria=motivacion`

**Ejemplo de respuesta**

```json
{ "frase": "No cuentes los días, haz que los días cuenten." }
```

**Si la categoría no existe:**

```json
{ "error": "No hay frases en esta categoría" }
```

### 📌 CHISTES

**GET** `https://random-quotes-0v69.onrender.com/api/chistes`

**Ejemplo de respuesta tipo pregunta-respuesta**

```json
{
  "_id": "67cd43a645826a998eecf8ed",
  "categoria": "tecnología",
  "tipo": "pregunta-respuesta",
  "pregunta": "¿Por qué los programadores prefieren el café frío?",
  "respuesta": "Porque el Java caliente es demasiado peligroso.",
  "__v": 0
}
```

**Ejemplo de respuesta tipo texto**

```json
{
  "_id": "67cd441b45826a998eecf8f7",
  "categoria": "tecnología",
  "tipo": "texto",
  "texto": "Si Java fuese una isla y C++ una montaña, JavaScript sería un castillo inflable.",
  "__v": 0
}
```

**GET** `https://random-quotes-0v69.onrender.com/api/chistes?categoria=random&tipo=pregunta-respuesta`

**Ejemplo de respuesta**

```json
{
  "_id": "67cd43f445826a998eecf8f3",
  "categoria": "random",
  "tipo": "pregunta-respuesta",
  "pregunta": "¿Qué hace una abeja en el gimnasio?",
  "respuesta": "Zum-ba.",
  "__v": 0
}
```

**Si la categoría o el tipo no existe:**

```json
{
  "error": "No hay chistes con estos criterios"
}
```

### 📌 DATOS CURIOSOS

**GET** `https://random-quotes-0v69.onrender.com/api/datos-curiosos`

**Ejemplo de respuesta**

```json
{
  "_id": "67cd3fd5bbbe40f3f866d6bc",
  "categoria": "ciencia",
  "texto": "El sonido no puede viajar en el espacio porque no hay aire para transportarlo.",
  "autor": "Anónimo",
  "__v": 0
}
```

**GET** `https://random-quotes-0v69.onrender.com/api/datos-curiosos?categoria=historia`

**Ejemplo de respuesta**

```json
{
  "_id": "67cd3fe2bbbe40f3f866d6be",
  "categoria": "historia",
  "texto": "Cleopatra vivió más cerca en el tiempo de la llegada del hombre a la Luna que de la construcción de las pirámides.",
  "autor": "Anónimo",
  "__v": 0
}
```

**Si la categoría o el tipo no existe:**

```json
{
  "error": "No hay datos curiosos en esta categoría"
}
```

### SOLICITUDES

Las claves con '\*' significan que son obligatorias.

**POST** `https://random-quotes-0v69.onrender.com/api/solicitudes/frases`

**Ejemplo de solicitud**

```json
{
  "categoria*": "Vida",
  "texto*": "Haz de cada día tu obra maestra.",
  "autor": "John Wooden"
}
```

**Ejemplo de respuesta**

```json
{
  "mensaje": "Solicitud enviada para revisión",
  "solicitud": {
    "categoria": "vida",
    "texto": "Haz de cada día tu obra maestra.",
    "autor": "John Wooden",
    "_id": "67cd4a4545826a998eecf91f",
    "__v": 0
  }
}
```

**POST** `https://random-quotes-0v69.onrender.com/api/solicitudes/chistes`

**Ejemplo de solicitud**

```json
{
  "categoria*": "Humor negro",
  "tipo": "texto",
  "texto": "El doctor me dijo que tengo 5 meses de vida… así que le robé su reloj, ahora tengo 7."
}
```

**Ejemplo de respuesta**

```json
{
  "mensaje": "Solicitud enviada para revisión",
  "solicitud": {
    "categoria": "humor negro",
    "tipo": "texto",
    "texto": "El doctor me dijo que tengo 5 meses de vida… así que le robé su reloj, ahora tengo 7.",
    "_id": "67cd4a4545826a998eecf91f",
    "__v": 0
  }
}
```

**POST** `https://random-quotes-0v69.onrender.com/api/solicitudes/datos-curiosos`

**Ejemplo de solicitud**

```json
{
  "categoria*": "Espacio",
  "texto": "En la Luna no hay viento, por eso las huellas de los astronautas permanecerán intactas por millones de años."
}
```

**Ejemplo de respuesta**

```json
{
  "mensaje": "Solicitud enviada para revisión",
  "solicitud": {
    "categoria": "espacio",
    "texto": "En la Luna no hay viento, por eso las huellas de los astronautas permanecerán intactas por millones de años.",
    "_id": "67cd4a4545826a998eecf91f",
    "__v": 0
  }
}
```
