export function getId(id) {
	if (!id) return null
	return Number(id.split('/').pop())
}
