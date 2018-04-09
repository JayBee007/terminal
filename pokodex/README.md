# Pokdex
### Client and Server implementation

#### Client
stack:
- reactjs
- redux
- redux-saga
- react-router
- axios
- sass
- webpack

#### dev  env `cmd: npm start`
#### prod build `cmd: npm run build`

One can login through facebook account and get a list of pokemons with id, name, avatar, types and abilities, search by name, types and abilities, favorite / unfavorite them and see the favorites on /pokemons/favorites route.

#### Server
stack:
- nodejs
- express
- mongodb
- mongoosejs
- axios (to make calls to pokeapi.co)

#### start mongo `cmd: npm run start:mongo`
#### start server  `cmd: npm start`

Server lets the client authenticate through facebook-token and in return provides with a JSON web token, which client sends as 'x-auth-token' headers on subsequent requests. On mongodb two models User and Favorites. User model stores the pokemons being pushed to favorites array and Favorites model caches them.

# TODO
Lint the code
Write test for both the client and server
Implement proper system to inform client about server errors
Fix server code with un handled promises and refactor models
DRY on the client