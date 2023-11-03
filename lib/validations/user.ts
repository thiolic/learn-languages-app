import { z } from 'zod';

export const UserValidationSchema = z.object({
	profile_photo: z
		.string({
			required_error: 'Profile photo is required',
		})
		.url(),
	name: z
		.string()
		.min(3, { message: 'Must be 3 or more characters long' })
		.max(30, { message: 'Must be 30 or fewer characters long' }),
	username: z
		.string()
		.min(3, { message: 'Must be 3 or more characters long' })
		.max(30, { message: 'Must be 30 or fewer characters long' }),
});
