export function load({ url }) {
	if (url.pathname === '/auth/login') {
		return { title: 'Welcome!', sub: 'Nice to see you again' };
	}

	return { title: 'Sign Up!', sub: 'Not a member yet?' };
}
