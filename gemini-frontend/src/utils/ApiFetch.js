export const fetchGeminiResponse = async (prompt) => {
      const res = await fetch('http://localhost:3001/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if(!res.ok) throw new Error("respuesta no valida") //si la respuesta no es valida, tira error

      const data = await res.json(); // se covierte la respuesta a JSON

      if(!data.response) throw new Error("La respuesta del bot esta vacía");//si data no es valido, tira error
      return data.response;
    };


