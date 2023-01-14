<script>
	import { scale } from 'svelte/transition';

	export let color = 'var(--background)';
	export let size = '69';
	export let links = [
		{
			title: 'Facebook',
			href: 'https://facebook.com/skeletonflowersandwater',
			svg: {
				code: `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}"
      height="${size}"><path d="M0 7.5a7.5 7.5 0 118 7.484V9h2V8H8V6.5A1.5 1.5 0 019.5 5h.5V4h-.5A2.5 2.5 0 007 6.5V8H5v1h2v5.984A7.5 7.5 0 010 7.5z" fill="currentColor"></path></svg>`
			}
		},
		{
			title: 'Youtube',
			href: 'https://youtube.com/skeletonflowersandwater',
			svg: {
				code: `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}"
      height="${size}"><path d="M8.599 7.5L7 8.566V6.434L8.599 7.5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.506 1.773a28.606 28.606 0 0111.988 0A1.905 1.905 0 0115 3.636v7.728c0 .898-.628 1.675-1.506 1.863a28.605 28.605 0 01-11.988 0A1.905 1.905 0 010 11.364V3.636c0-.898.628-1.675 1.506-1.863zm5.271 3.311A.5.5 0 006 5.5v4a.5.5 0 00.777.416l3-2a.5.5 0 000-.832l-3-2z" fill="currentColor"></path></svg>`
			}
		},
		{
			title: 'Instagram',
			href: 'https://instagram.com/skeletonflowersandwater',
			svg: {
				code: `<svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}">
      <path d="M7.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="currentColor" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.5 0A4.5 4.5 0 000 4.5v6A4.5 4.5 0 004.5 15h6a4.5 4.5 0
        004.5-4.5v-6A4.5 4.5 0 0010.5 0h-6zM4 7.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7
        0zM11 4h1V3h-1v1z"
        fill="currentColor" />
    </svg>`
			}
		}
	];
</script>

<div>
	{#each links as { href, title, svg }, i}
		<a
			style={`color: ${color};`}
			in:scale={{ delay: (i + 1) * 100 + 500, start: 0 }}
			{href}
			aria-label={title}>{@html svg.code}</a
		>
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
	}
	a {
		color: var(--textColor);
		transition: all 0.4s;
		margin: 0;
		display: flex;
		align-items: center;
	}
	a:hover {
		/* color: var(--primary); */
		/* color: var(--yellow); */
		transform: scale(0.9);
	}
</style>
