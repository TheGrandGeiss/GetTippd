import 'dotenv/config';
import { defineConfig } from '@prisma/config'; // Ensure the '@' is there

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // USE DIRECT_URL HERE for migrations (Port 5432)
    url: process.env.DIRECT_URL,
  },
});
