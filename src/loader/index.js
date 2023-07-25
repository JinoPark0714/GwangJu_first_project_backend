import { setExpress } from './express.js';
import { setRouter } from './router.js';

export async function init(app) {
  setExpress(app);
  setRouter(app);
}