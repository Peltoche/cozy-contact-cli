import {getAllContacts} from '../utils.js'
import parsePhoneNumber from 'libphonenumber-js'


export default async (client, country) => {
	const allContacts = await getAllContacts(client)
	for (let contact of allContacts) {
		if (!contact.phone || contact.phone.length == 0) {
			continue
		}

		let modified = 0

		for (let phone of contact.phone) {
			const parsed = parsePhoneNumber(phone.number, country)
			if (parsed.number == phone.number) {
				continue
			}

			console.log(contact.fullname, ': ', phone.number, ' => ', parsed.number)

			phone.number = parsed.number
			modified += 1

		}

		if (modified > 0) {
			let res = await client.stackClient.collection('io.cozy.contacts').update(contact)
			if (res.data) {
				console.log(contact.fullname, modified, 'contact successfully modified\n')
			} else {
				console.log(res)
				return
			}
		}
	}
}
