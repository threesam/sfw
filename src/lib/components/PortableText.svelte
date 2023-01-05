<script lang="ts">
	export let text;

	import { PortableText } from '@portabletext/svelte';
</script>

<PortableText value={text} />
