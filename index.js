import m from './src/handlers/m';
import talk from './src/handlers/talk';
import { Router } from 'itty-router';

// Create a new router
const router = Router();

router.post("/m", m);
router.post("/talk", talk);

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})

addEventListener('queue', (e) => {
  e.waitUntil(talk(e));
})