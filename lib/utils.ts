import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const isBase64Image = (imageData: string) => {
	const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;

	return base64Regex.test(imageData);
};
