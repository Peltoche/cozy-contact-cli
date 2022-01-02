import {getAllContacts} from '../utils.js'

export default async (client, country) => {
  const contacts = await getAllContacts(client)

  const res = await client.stackClient.collection('io.cozy.contacts').destroyAll(contacts)
	console.log(`${res.length} contacts have been successfully deleted`)
}
