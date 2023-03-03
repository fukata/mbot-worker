import qs from 'qs';

// const postToSlack = async (blocks) => {
//   return await fetch(SLACK_WEBHOOK_URL, {
//     body: JSON.stringify({ blocks }),
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   });
// };

export default async request => {
  const body = await request.text();
  const params = qs.parse(body);
  const text = params['text'].trim();

  await QUEUE.send({text: text});
  return new Response(`考え中：${text}`);
};
