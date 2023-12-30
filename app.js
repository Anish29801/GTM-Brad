const express = require('express');
const app = express();
const { TagManagerApi } = require('@google-tag-manager/api');


/*
const clientId = '41441728161-v1p0dnsumb45knrt3isr82cickenge9b.apps.googleusercontent.com'; // Replace with your client ID
const clientSecret = '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'; // Replace with your client secret
const redirectUri = 'http://localhost:3000'; // Replace with your redirect URI

 accountId: '6210496641',
containerId: '173799065',
workspaceId: '2',
*/

// ... other middleware and routes
async function createTagInGTM(orderId) {
    const api = new TagManagerApi({
        clientId: 'YOUR_GTM_CLIENT_ID',
        path: 'path/to/your/gtm/service/account/container',
    });

    const tag = {
        name: orderId,
        // ... other tag configuration (triggers, etc.)
    };

    try {
        const response = await api.createTag(tag);
        console.log('Tag created:', response);
    } catch (error) {
        console.error('Error creating tag:', error);
        throw error;
    }
}

app.post('/shopify-webhook', (req, res) => {
    // Process Shopify order data
    const orderId = req.body.order_id;
    // ...

    // Create tag in Google Tag Manager
    createTagInGTM(orderId)
        .then(() => res.send('Tag created successfully'))
        .catch(error => res.status(500).send('Error creating tag'));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
