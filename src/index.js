import fetch from 'node-fetch'
import {createClientInteractive} from 'cozy-client'
import open from 'open'
import parsePhoneNumber from 'libphonenumber-js'
import {selectActions, selectCountry} from './menu.js'
import normalize from './actions/normalize.js'
import removeDuplicateNumber from './actions/duplicatenumber.js'
import {Command, Option} from 'commander'

global.fetch = fetch

const program = new Command();
program
	.version('0.0.1')
	.description('interact with your Cozy contacts from the cli');


program
	.requiredOption('-u, --uri <uri>', 'Instance uri ("https://myinstance.mycozy.cloud")')
	.parse()

const uri = program.opts().uri



let client = await createClientInteractive({
	uri: uri,
	scope: ['io.cozy.contacts'],
	oauth: {
		clientName: 'Cozy Contact CLI',
		softwareID: 'CozyContactCLI',
	}
})

switch (await selectActions()) {
	case 'normalize':
		const country = await selectCountry()
		await normalize(client, country)
		break
	case 'duplicate-number':
		await removeDuplicateNumber(client)
		break
}
