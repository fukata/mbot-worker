import qs from 'qs';

export default async request => {
  const body = await request.text();
  const params = qs.parse(body);
  const text = params['text'].trim();

  await QUEUE.send({text: text});
  return new Response(`考え中：${text}`);
};
