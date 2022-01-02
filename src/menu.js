import prompts from 'prompts'

async function selectActions() {
	const response = await prompts([
		{
			type: 'select',
			name: 'actions',
			message: 'Which clean do you want to do?',
			choices: [
				{ title: 'Normalize phonenumber to the international format (+33xxx)', value: 'normalize' },
				{ title: 'Remove duplicate phonenumbers inside a contact', value: 'duplicate-number' },
				{ title: 'Remove all your contacts', value: 'remove-all' },
			],
		}
	])

	return response.actions
}


async function selectCountry() {
	const response = await prompts([
		{
			type: 'text',
			name: 'country',
			message: 'You need to select a fallback country for all the phonenumbers where we can\'t deduce the country (default: "FR")',
		}
	])

	if (response.country.length === 0) {
		return 'FR'
	}

	return response.country
}

export {
	selectActions,
	selectCountry,
}
