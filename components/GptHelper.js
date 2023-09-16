import OpenAI from 'openai';

const GptHelper = {};
GptHelper.checkProfanity = async (prompt) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Can you check whether the following statement seems like illegal buying and selling of organs "${prompt}".  Give me a yes or no answer. Only one word answer.`,
      },
    ],
  });
  console.log(chatCompletion.choices[0].message);

  //   chatCompletion();
};

export default GptHelper;
