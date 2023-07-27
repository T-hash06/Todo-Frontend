import type { HttpMethod } from '@sveltejs/kit';

export type HttpCode = -1 | 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500;

export type HttpResponse<T> = {
	code: HttpCode;
	data: T;
};

export type ResponseFallback<T> = (payload: T) => void;

export type SessionPayload = {
	username: string;
	name: string;
	email: string;
	iat: number;
	exp: number;
};

export type Todo = {
	id: number;
	title: string;
	label: string;
	description: string;
	priority: number;
	done: boolean;
};

export class HttpRequest {
	private method: HttpMethod = 'GET';
	private endpoint = '/api';
	private resource = '';
	private headers = {} as Record<string, string>;

	private body: unknown = undefined;
	private hasDefaultFallback = false;

	private cases = {} as Record<HttpCode, ResponseFallback<unknown>>;

	public setEndpoint(endpoint: string): HttpRequest {
		this.endpoint = endpoint;
		return this;
	}

	public setResource(resource: string): HttpRequest {
		this.resource = resource;
		return this;
	}

	public setMethod(method: HttpMethod): HttpRequest {
		this.method = method;
		return this;
	}

	public setBody(body: unknown): HttpRequest {
		this.body = body;
		return this;
	}

	public setHeader(key: string, value: string): HttpRequest {
		this.headers[key] = value;
		return this;
	}

	public setBearer(bearer: string): HttpRequest {
		this.setHeader('Authorization', `Bearer ${bearer}`);
		return this;
	}

	public addResponse<T>(code: HttpCode | null, fallback: ResponseFallback<T>): void {
		if (code === null) {
			this.hasDefaultFallback = true;
			this.cases[-1] = fallback as ResponseFallback<unknown>;

			return;
		}

		this.cases[code] = fallback as ResponseFallback<unknown>;
	}

	public async execute(fetcher: typeof fetch = fetch): Promise<void> {
		if (this.hasDefaultFallback === false) throw new Error('Default fallback is not defined');

		try {
			const response = await fetcher(`${this.endpoint}/${this.resource}`, {
				method: this.method,
				body: JSON.stringify(this.body),
				headers: {
					'Content-Type': 'application/json',
					...this.headers
				}
			});

			const contentType = response.headers.get('content-type') ?? 'text/html';
			const data = await (contentType.startsWith('application/json')
				? response.json()
				: response.text());

			const code = response.status as HttpCode;

			if (this.cases[code] === undefined) {
				this.cases[-1](data);

				return;
			}

			this.cases[code](data);
		} catch (error) {
			this.cases[-1](error);
		}
	}
}
