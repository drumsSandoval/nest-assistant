import OpenAI from 'openai';

interface Options {
  prompt: string;
}

class AssistantHandler {
  public openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
  });
  orthographyCheck = async (options: Options) => {
    const { prompt } = options;
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales.
          Las palabras usadas deben existir en el diccionario de la RAE.
        Debes de responder en formato JSON,
        tu tarea es corregirlos y retornar información sulicones
        también debes de dar un porcentaje de acierto por el usuario, 
        Si no hay errores, debes de retornar un mensaje de felicitaciones.  
        Ejemplo de salida: 
        {
          userScore: number,
          errors: string[], // ['error -> solución'],
          message: string, // usa emojis y texto para darle feedback al usuario
        }
        `,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo-0301',
      temperature: 0.3,
      max_tokens: 150,
    });
    const jsonResp = JSON.parse(completion.choices[0].message.content);
    return jsonResp;
  };

  prosConsDicusser = async ({ prompt }: Options) => {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
la respuesta debe de ser en formato markdown,
los pros y contras deben de estar en una lista,`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });
    return response.choices[0].message;
  };

  prosConsDicusserStream = async ({ prompt }: Options) => {
    return await this.openai.chat.completions.create({
      stream: true,
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
la respuesta debe de ser en formato markdown,
los pros y contras deben de estar en una lista,`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });
  };
}

export default AssistantHandler;
