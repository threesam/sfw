<script lang="ts">
	import { Container, Heading, Html, Hr, Img, Link, Preview, Text } from 'svelte-email'
	import type { PrintfulCustomer, PrintfulShipmentInfo } from '../../app'

	export let orderNumber: string
	export let shipment: PrintfulShipmentInfo
	export let customer: PrintfulCustomer
</script>

<Html lang="en">
	<Preview preview="Skeleton Flowers and Water tracking info" />
	<Container>
		<Heading style={{ margin: 0 }} as="h1">Shipped!</Heading>

		<Text>
			Your order ({orderNumber}) has been shipped to: <br />
			<strong>{customer.name}</strong>
			{customer.address1}{#if customer.address2}, {customer.address2}{/if},
			{customer.city}, {customer.state_code},
			{customer.country_name}
		</Text>

		<Hr />

		<Heading as="h3">Tracking Info</Heading>
		<Link href={shipment.tracking_url}>{shipment.tracking_url}</Link>

		<br />
		<br />

		<Img
			src="https://cdn.sanity.io/images/4yxngtwt/production/df0b294263b9284c4c170bb80d500b594a220138-1024x1024.jpg"
			width="200"
			height="200"
			alt="Skeleton Flowers and Water logo"
		/>
	</Container>
</Html>
