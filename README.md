# StageBlocks Technical Takehome

## Installation
- For ssh
```
git clone git@github.com:jcdampil23/technical-takehome.git
cd technical-takehome
npm install

```
- For Https
```
git clone git@github.com:jcdampil23/technical-takehome.git
cd technical-takehome
npm install
```

- Incase types and graphQL schema doesn't exists
```
  npm run generate:types
  npm run generate:graphQLSchema
```

## Usage
- Running the project locally
```
  cp .env.example .env
  set the environment variables to your specifications
  npm run dev
```

- Create an admin account (will require you to create an admin on first visit)
```
  This assumes that you set the env to http://localhost:3000
  Visit loclahost:3000/admin
  Input the details required
```

- To setup the User based access control (UBAC), (only admins can change users roles and permissions)
```
Visit the user collection
Use the checkbox on the permissions for events or pages
After setting it up, upon refresh the website will apply the changes to the permissions
```
