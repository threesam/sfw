<script lang="ts">
	import { Container, Heading, Html, Hr, Img, Preview, Text } from 'svelte-email'
	import type { PrintfulOrder } from '$types'

	export let order: PrintfulOrder
</script>

<Html lang="en">
	<Preview preview="Skeleton Flowers and Water receipt" />
	<Container style={{ fontFamily: 'monospace' }}>
		<Heading style={{ margin: 0 }} as="h1">Thanks, {order.recipient.name}!</Heading>

		<Text>
			Your order ({order.id}) has been processed. We will let you know when it ships!
		</Text>

		<Hr />

		<Heading style={{ margin: 0 }} as="h5">Items</Heading>
		{#each order.items as item}
			<Text>
				{item.quantity} X {item.name}
			</Text>
		{/each}

		<br />

		<Img
			src="https://cdn.sanity.io/images/4yxngtwt/production/df0b294263b9284c4c170bb80d500b594a220138-1024x1024.jpg"
			width="200"
			height="200"
			alt="Skeleton Flowers and Water logo"
		/>
	</Container>
</Html>
