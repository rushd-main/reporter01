import { redirect, fail } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';

export const load: PageServerLoad = async () => {
	//TODO: Load user Data
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return fail(400, { invalid: true });
	}

	const user = await db.user.findUnique({ where: { username } });

	if (!user) {
		return fail(400, { credentials: true });
	}

	const userPassword = await bcrypt.compare(password, user?.password);
	if (!userPassword) {
		return fail(400, { credentials: true });
	}

	const authenticatedUser = await db.user.update({
		where: { username: user.username },
		data: { userAuthToken: crypto.randomUUID() }
	});

	cookies.set('session', authenticatedUser.userAuthToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/dashboard');
};

export const actions: Actions = { login };
