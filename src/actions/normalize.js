import {getAllContacts} from '../utils.js'
import parsePhoneNumber from 'libphonenumber-js'


export default async (client, country) => {
	const allContacts = await getAllContacts(client)
	for (const contact of allContacts) {
		if (!contact.phone || contact.phone.length == 0) {
			continue
		}

		for (const phone of contact.phone) {
			const parsed = parsePhoneNumber(phone.number, country)
			if (parsed.number !== phone.number) {
				console.log(contact.fullname, ': ', phone.number, ' => ', parsed.number)
			}
		}
	}
}
