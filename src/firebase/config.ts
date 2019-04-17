import * as dotenv from 'dotenv';

dotenv.config();

export default {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
};
