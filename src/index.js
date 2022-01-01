import fetch from 'node-fetch'
import {createClientInteractive} from 'cozy-client'
import open from 'open'
import parsePhoneNumber from 'libphonenumber-js'
import {selectActions, selectCountry} from './menu.js'
import normalize from './actions/normalize.js'

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

const actions = await selectActions()

if (actions.includes('normalize')) {
	const country = await selectCountry()
	console.log('country selected: ', country)
	await normalize(client, country)
}




