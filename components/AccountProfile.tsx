'use client';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { UserValidationSchema } from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';

interface AccountProfileProps {
	user: {
		id: string;
		objectId: string;
	};
	btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const startUpload = useUploadThing('media');

	const form = useForm({
		resolver: zodResolver(UserValidationSchema),
		defaultValues: {
			profile_photo: '',
			name: '',
			username: '',
			bio: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof UserValidationSchema>) => {
		const blob = values.profile_photo;

		const hasImageChanged = isBase64Image(blob);
		if (hasImageChanged) {
			const imgRes = await startUpload(files);

			if (imgRes && imgRes[0].fileUrl) {
				values.profile_photo = imgRes[0].fileUrl;
			}
		}
	};

	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="profile_photo"
					render={({ field }) => (
						<FormItem className="flex items-center gap-4">
							<FormLabel>
								<Image
									src={
										field.value
											? field.value
											: '/assets/profile-default.svg'
									}
									alt="Profile photo"
									width={96}
									height={96}
									priority
									className="rounded-full object-contain"
								/>
							</FormLabel>
							<FormControl>
								<Input
									type="file"
									accept="image/*"
									placeholder="Upload a photo"
									onChange={(e) =>
										handleImage(e, field.onChange)
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex flex-col my-4">
							<FormLabel className="text-lg">Name</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="text-lg"
									placeholder="Name"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex flex-col my-4">
							<FormLabel className="text-lg">Username</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="text-lg"
									placeholder="Username"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;
