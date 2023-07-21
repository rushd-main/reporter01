import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export const load: PageServerLoad = async () => {
	//TODO: load userdata
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');
	const confirmPassword = data.get('confirmPassword');

	if (
		typeof username !== 'string' ||
		typeof password !== 'string' ||
		typeof confirmPassword !== 'string' ||
		!username ||
		!password ||
		!confirmPassword
	) {
		return fail(400, { invalid: true });
	}

	if (password !== confirmPassword) {
		return fail(400, { invalid: true, passwordMatch: true });
	}

	const user = await db.user.findUnique({ where: { username } });
	if (user) {
		return fail(400, { user: true });
	}

	await db.user.create({
		data: {
			username,
			password: await bcrypt.hash(password, 10),
			userAuthToken: crypto.randomUUID(),
			role: { connect: { name: Roles.USER } }
		}
	});

	throw redirect(303, '/login');
};

export const actions: Actions = { register };
