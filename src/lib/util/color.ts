export function getRandomColor() {
	const hue = Math.floor(Math.random() * 360);
	const saturation = 80;
	const lightness = 68;

	const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

	return color;
}

export function getSequentialColor(index: number) {
	const hue = ((index * 137.508) % 360).toFixed();
	const saturation = 95;
	const lightness = 68;

	const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

	return color;
}
