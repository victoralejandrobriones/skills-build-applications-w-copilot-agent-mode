import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp, getApiBaseUrl } from './server.js';
test('health endpoint responds with the expected API base URL', async () => {
    const app = createApp();
    const server = app.listen(0);
    const address = server.address();
    try {
        const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
        assert.equal(response.status, 200);
        const body = await response.json();
        assert.equal(body.status, 'ok');
        assert.equal(body.apiUrl, getApiBaseUrl());
    }
    finally {
        await new Promise((resolve, reject) => {
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
