# cozy-contact-cli

A little CLI to interact with your contact from the [Cozy](https://cozy.io/fr/) account.


### Why ?

At the moment the contact app are missing some features an so I have made a little cli in order to
respond quickly to some of my needs.

### What ?

This cli is able to do the following actions:

- **Normalize you phone number** to the international format (+33X...).
- **Remove the duplicate numbers** into a same contact.
- **Delete all your contact**.


### How to use it?

```
git clone https://github.com/Peltoche/cozy-contact-cli
yarn install
yarn start --url=https://mysuperinstance.mycozy.cloud
```

At the first utilisation the cli will redirect you to an browser where you will need to connect to your instance and authorize the application. This tools doesn't have
access to you password and can only interact with you contact data.

