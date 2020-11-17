export const firstCharToUpperCase = (path: any): string => {
	const word = path.match(/\w+/)[0]
	return word.charAt(0).toUpperCase() + word.slice(1)
}