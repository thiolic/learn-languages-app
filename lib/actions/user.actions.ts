'use server';

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface updateUserParams {
	userId: string,
	username: string,
	name: string,
	image:string,
	path:string,
}

export const updateUser = async ({
	userId,
	username,
	name,
	image,
	path,
}: updateUserParams): Promise<void> => {
	connectToDB();

	try {
		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				image,
				onboarded: true,
			},
			{
				upsert: true,
			}
		);

		if (path === '/profile/edit') {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
};
