import {
	SignIn,
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
} from '@clerk/nextjs';
import { BookOpenCheck, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
	return (
		<header className="flex items-center justify-between bg-sky-700 p-6">
			<nav
				className="max-w-full flex items-center justify-between text-white"
				aria-label="Global"
			>
				<Link className="flex items-center" href="/">
					<BookOpenCheck color="#fff" size={32} />
					<span className="sr-only">Home</span>
				</Link>
			</nav>
			<SignedOut>
				<SignInButton>
					<button className="">
						<LogIn color="#fff" size={32} />
					</button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<SignOutButton>
					<button>
						<LogOut color="#fff" size={32} />
					</button>
				</SignOutButton>
			</SignedIn>
		</header>
	);
};

export default Header;
