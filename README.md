## 🚀 Endpoints

### 📌 Obtener una frase aleatoria

**GET** `/api/frases`

**Ejemplo de respuesta**

```json
{ "frase": "El éxito es la suma de pequeños esfuerzos repetidos día tras día." }
```

**GET** `/api/frases?categoria=motivacion`

**Ejemplo de respuesta**

```json
{ "frase": "No cuentes los días, haz que los días cuenten." }
```

**Si la categoría no existe:**

```json
{ "error": "Categoría no encontrada" }
```
"# random-quotes-api" 
