import fetch from 'node-fetch'
import {createClientInteractive, QueryDefinition} from 'cozy-client'
import open from 'open'
import parsePhoneNumber from 'libphonenumber-js'

global.fetch = fetch

let client = await createClientInteractive({
  // uri: 'https://jeanbon.mycozy.cloud',
  uri: 'https://peltochetest.mycozy.cloud',
  scope: ['io.cozy.contacts'],
  oauth: {
    clientName: 'Cozy Contact CLI',
    softwareID: 'CozyContactCLI',
  }
})

const getAllContacts = async client => {
  const query = new QueryDefinition({
    doctype: 'io.cozy.contacts',
    limit: null
  })
  const resp = await client.query(query)
  return resp.data
}

const allContacts = await getAllContacts(client)

for (const contact of allContacts) {
	if (!contact.phone || contact.phone.length == 0) {
		continue
	}

	for (const phone of contact.phone) {
		console.log(contact.fullname, ' => ', phone)
	}
}
