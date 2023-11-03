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
import { updateUser } from '@/lib/actions/user.actions';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { UserValidationSchema } from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(UserValidationSchema),
		defaultValues: {
			profile_photo: '',
			name: '',
			username: '',
		},
	});

	const onSubmit = async ({
		profile_photo,
		username,
		name,
	}: z.infer<typeof UserValidationSchema>) => {
		console.log(22222);
		const blob = profile_photo;

		await updateUser({
			userId: user.id,
			username,
			name,
			image: profile_photo,
			path: pathname,
		});

		if (pathname === '/profile/edit') {
			router.back();
		} else {
			router.push('/');
		}
	};

	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setFiles(Array.from(e.target.files));

			if (!file.type.includes('image')) return;

			fileReader.onload = async (event) => {
				const imageDataUrl = event.target?.result?.toString() || '';
				fieldChange(imageDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
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
							<FormMessage></FormMessage>
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
				<Button type="submit">{btnTitle}</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;
