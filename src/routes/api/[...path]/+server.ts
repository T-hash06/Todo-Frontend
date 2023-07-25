import type { RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { BACKEND_ENDPOINT } from '$env/static/private';

function mutateRequest({ params, url, request }: RequestEvent) {
	const proxyRequest = new Request(`${BACKEND_ENDPOINT}/${params.path + url.search}`, request);
	proxyRequest.headers.set('x-api-key', 'test');

	return proxyRequest;
}

const proxy = (async (event) => {
	try {
		return await fetch(mutateRequest(event));
	} catch (e) {
		const response = new Response(null, { status: 404 });
		return response;
	}
}) satisfies RequestHandler;

export const GET = proxy;

export const POST = proxy;

export const PATCH = proxy;

export const DELETE = proxy;
