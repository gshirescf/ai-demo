/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		try {
			// Parse the incoming request body with explicit typing
			const requestBody = (await request.json()) as { prompt: string };

			// Destructure the prompt from the typed request body
			const { prompt } = requestBody;
			console.log(prompt);

			// Construct messages array with the dynamic prompt
			const messages = [
				{ role: 'system', content: 'You are a friendly assistant' },
				{ role: 'user', content: prompt },
			];
			console.log(messages);

			// Call the AI service with the dynamic prompt
			const response = await env.AI.run('@cf/meta/llama-2-7b-chat-fp16', { messages } as BaseAiTextGeneration['inputs']);
			console.log(response);

			// Respond with the AI's result
			return Response.json(response);
		} catch (error) {
			// Handle errors
			return new Response('Error processing request', { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
