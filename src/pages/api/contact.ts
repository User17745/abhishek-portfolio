import type { APIRoute } from 'astro';
import { siteConfig } from '@/lib/config';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();

        const name = formData.get('name')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const phoneCode = formData.get('phoneCode')?.toString() || '';
        const phone = formData.get('phone')?.toString() || '';
        const message = formData.get('message')?.toString() || '';
        const files = formData.getAll('attachments') as File[];

        const fullPhone = phone ? `${phoneCode} ${phone}`.trim() : '';

        // Environment Variables
        const env = typeof process !== 'undefined' && process.env ? process.env : (import.meta as any).env;
        const viteEnv = (import.meta as any).env;

        const apiToken = env.ATLASSIAN_JIRA_API_TOKEN || viteEnv.ATLASSIAN_JIRA_API_TOKEN;
        const projectUrl = env.JIRA_PROJECT_URL || viteEnv.JIRA_PROJECT_URL || '';
        const nameField = env.JIRA_NAME_FIELD_ID || viteEnv.JIRA_NAME_FIELD_ID;
        const emailField = env.JIRA_EMAIL_FIELD_ID || viteEnv.JIRA_EMAIL_FIELD_ID;
        const phoneField = env.JIRA_PHONE_FIELD_ID || viteEnv.JIRA_PHONE_FIELD_ID;
        const messageField = env.JIRA_MESSAGE_FIELD_ID || viteEnv.JIRA_MESSAGE_FIELD_ID;

        if (!apiToken || !projectUrl) {
            return new Response(JSON.stringify({ error: 'Jira configuration is missing' }), { status: 500 });
        }

        // Parse Project URL (e.g. https://<subdomain>.atlassian.net/jira/software/projects/<KAN>/boards/2)
        let baseUrl = '';
        let projectKey = 'KAN';
        try {
            const urlObj = new URL(projectUrl);
            baseUrl = urlObj.origin;
            const match = urlObj.pathname.match(/\/projects\/([A-Z0-9]+)/i);
            if (match) {
                projectKey = match[1];
            }
        } catch (e) {
            return new Response(JSON.stringify({ error: 'Invalid JIRA_PROJECT_URL' }), { status: 500 });
        }

        // Default Email from siteConfig
        const jiraUserEmail = env.JIRA_USER_EMAIL || viteEnv.JIRA_USER_EMAIL || siteConfig.contact.email;
        const authHeader = `Basic ${Buffer.from(`${jiraUserEmail}:${apiToken}`).toString('base64')}`;

        // Prepare Issue Data
        const issueData = {
            fields: {
                project: { key: projectKey },
                summary: `New Lead: ${name}`,
                issuetype: { name: 'Task' }, // Assuming 'Task' is available
                description: {
                    type: 'doc',
                    version: 1,
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: message }
                            ]
                        }
                    ]
                }
            } as any
        };

        if (nameField) issueData.fields[nameField] = name;
        if (emailField) issueData.fields[emailField] = email;
        if (phoneField) issueData.fields[phoneField] = fullPhone;
        if (messageField) issueData.fields[messageField] = message;

        // Create the Issue
        const createRes = await fetch(`${baseUrl}/rest/api/3/issue`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(issueData)
        });

        if (!createRes.ok) {
            const errorText = await createRes.text();
            console.error('Jira Create Issue Error:', errorText);
            return new Response(JSON.stringify({ error: 'Failed to create Jira issue', details: errorText }), { status: createRes.status });
        }

        const issueDataRes = await createRes.json();
        const issueId = issueDataRes.id;

        // Handle Attachments
        const validFiles = files.filter(f => f.size > 0 && f.name);
        if (validFiles.length > 0) {
            const attachmentFormData = new FormData();
            validFiles.forEach(file => {
                attachmentFormData.append('file', file, file.name);
            });

            const attachRes = await fetch(`${baseUrl}/rest/api/3/issue/${issueId}/attachments`, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'X-Atlassian-Token': 'no-check',
                    'Accept': 'application/json'
                },
                body: attachmentFormData
            });

            if (!attachRes.ok) {
                const attachError = await attachRes.text();
                console.error('Jira Attachments Error:', attachError);
                // Continue but log error
            }
        }

        return new Response(JSON.stringify({ success: true, issueId }), { status: 200 });
    } catch (error: any) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
    }
};
