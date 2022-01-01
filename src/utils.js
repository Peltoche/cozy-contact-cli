import {QueryDefinition} from 'cozy-client'

const getAllContacts = async client => {
  const query = new QueryDefinition({
    doctype: 'io.cozy.contacts',
    limit: null
  })
  const resp = await client.query(query)
  return resp.data
}

export {
	getAllContacts
}
