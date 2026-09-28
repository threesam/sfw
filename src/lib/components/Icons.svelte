<script>
	let { strokeColor = '#000', type = '' } = $props()
</script>

<div>
	{#if type === 'cart'}
		<span class="sr-only">cart</span>
		<svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke={strokeColor}
			><path
				d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/><path d="M1 5H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path
				d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/></svg
		>
	{:else if type === 'close'}
		<span class="sr-only">close</span>
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			stroke={strokeColor}
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
			shape-rendering="geometricPrecision"
			class="hover:text-accent-3 h-6 w-6"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg
		>
	{:else if type === 'minus'}
		<span class="sr-only">decrement</span>

		<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
			><path
				d="M5 12H19"
				stroke={strokeColor}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/></svg
		>
	{:else if type === 'plus'}
		<span class="sr-only">increment</span>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
			><path
				d="M12 5V19"
				stroke={strokeColor}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/><path
				d="M5 12H19"
				stroke={strokeColor}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/></svg
		>
	{:else if type === 'menu'}
		<span class="sr-only">menu</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke={strokeColor}
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16m-7 6h7"
			/></svg
		>
	{:else if type === 'caretRight'}
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			stroke={strokeColor}
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
			shape-rendering="geometricPrecision"
			class="Collapse_icon__JsuEg"><path d="M9 18l6-6-6-6" /></svg
		>
	{/if}
</div>
