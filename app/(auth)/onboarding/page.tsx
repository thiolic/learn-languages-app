import AccountProfile from '@/components/AccountProfile';
import { currentUser } from '@clerk/nextjs';
import React from 'react';

const Page = async () => {
	const user = await currentUser();
	const userInfo = {};
	const userData = {
		id: '',
		objectId: '',
	};

	return (
		<>
			<header className="flex items-center justify-between bg-sky-700 p-6">
				<h1 className="text-3xl text-white">Onboarding</h1>
			</header>
			<main className="flex justify-center m-auto max-w-full px-5 py-10">
				<section className="bg-sky-700 p-5 text-white min-w-[30%]">
					<AccountProfile user={userData} btnTitle="Continue" />
				</section>
			</main>
		</>
	);
};

export default Page;
