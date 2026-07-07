import test from 'node:test';
import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import mongoose from 'mongoose';
import { createApp, getApiBaseUrl } from './server.js';

test('health endpoint responds with the expected API base URL', async () => {
  const app = createApp();
  const server = app.listen(0);
  const address = server.address() as AddressInfo;

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
    assert.equal(response.status, 200);

    const body = await response.json() as { status: string; apiUrl: string };
    assert.equal(body.status, 'ok');
    assert.equal(body.apiUrl, getApiBaseUrl());
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
});

test('collection endpoints return an empty array when MongoDB is unavailable', async () => {
  await mongoose.disconnect().catch(() => undefined);

  const app = createApp();
  const server = app.listen(0);
  const address = server.address() as AddressInfo;

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/api/users`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), []);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
});
