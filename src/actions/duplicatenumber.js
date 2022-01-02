import {getAllContacts} from '../utils.js'
import parsePhoneNumber from 'libphonenumber-js'

export default async (client, country) => {
	const allContacts = await getAllContacts(client)

	for (const contact of allContacts) {
		if (!contact.phone || contact.phone.length == 0) {
			continue
		}

		const uniquePhoneArray = contact.phone.filter((obj, pos, self) => {
			return pos === self.findIndex((el) => el['number'] === obj['number'])
		})


		if (uniquePhoneArray.length != contact.phone.length) {
			console.log(contact.fullname, ': ', contact.phone, ' => ', uniquePhoneArray)

			let newContact = Object.assign({}, contact)
			newContact.phone = uniquePhoneArray

			let res = await client.stackClient.collection('io.cozy.contacts').update(newContact)
			if (res.data) {
			} else {
				console.log(res)
				return
			}
		}
	}
}
