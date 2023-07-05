export function niceDate(date: string) {
	let dateString = new Date(date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'});
	return dateString;
}
export function niceTime(date: string) {
	const timeString = new Date(date).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
	return timeString;
}
