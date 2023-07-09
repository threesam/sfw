<script lang="ts">
	import { Container, Heading, Html, Hr, Img, Link, Preview, Text } from 'svelte-email'
	import type { PrintfulOrder, PrintfulShipmentInfo } from '$types'

	export let order: PrintfulOrder
	export let shipment: PrintfulShipmentInfo
</script>

<Html lang="en">
	<Preview preview="Skeleton Flowers and Water tracking info" />
	<Container style={{ fontFamily: 'monospace' }}>
		<Heading style={{ margin: 0 }} as="h1">Shipped!</Heading>

		<Text>
			Your order ({order.id}) has been shipped to: <br />
			<strong>{order.recipient.name}</strong>
			{order.recipient.address1}{#if order.recipient.address2}, {order.recipient.address2}{/if},
			{order.recipient.city}, {order.recipient.state_code},
			{order.recipient.country_name}
		</Text>

		<Hr />

		<Heading as="h3">Tracking Info</Heading>
		<Link href={shipment.tracking_url}>{shipment.tracking_url}</Link>

		<br />

		<h4 style="margin: 0; padding-top: 32px;">Skeleton Flowers and Water</h4>
		<!-- <address>address</address> -->
		<Img
			src="https://cdn.sanity.io/images/4yxngtwt/production/df0b294263b9284c4c170bb80d500b594a220138-1024x1024.jpg"
			width="200"
			height="200"
			alt="Skeleton Flowers and Water logo"
		/>
	</Container>
</Html>
