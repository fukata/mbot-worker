import qs from 'qs';
import { Configuration, OpenAIApi } from 'openai';
import fetchAdapter from "@haverstack/axios-fetch-adapter";

const postToSlack = async (blocks) => {
  return await fetch(SLACK_WEBHOOK_URL, {
    body: JSON.stringify({ blocks }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
};

const fetchExternal = async () => {
  return await fetch(SLACK_WEBHOOK_URL);
}

export default async (messageBatch) => {
  console.log(JSON.stringify(messageBatch));
  const message = messageBatch.messages[0];
  console.log(JSON.stringify(message));
  const params = qs.parse(message.body);
  const text = params['text'].trim();

  console.log(text);
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log('==> createChatCompletion');
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }],
  }, { adapter: fetchAdapter });
  console.log('<== createChatCompletion');
  console.log(JSON.stringify(res));
  const replyText = res.data.choices[0].message.content;
  console.log(replyText);
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `> ${text}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: replyText,
      },
    }
  ];
  await postToSlack(blocks);
};
