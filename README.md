# mithril-map-router
Map over route changes like you map over arrays!


#### Getting start

`npm install mithril-map-router`

Now let's give every route access to a `data` object for shared context.
Easy with ramda's `R.always`.

```js
var R = require('ramda');
var m = require('mithril')
var mapRoutes = require('mithril-map-router')(m)

/*
  Automatically parameterize every component
  with the data object.
  
*/
mapRoutes(R.always(data), container, '/' ,{
	'/': Home,
	'/access/login': Login, 
	'/access/verify': Verify, 
	'/access/invite': Invite, 
	'/access/forgot': Forgot, 
	'/access/reset': Reset, 
	'/access/signup': SignUp, 
})
```

Or you could do something more advanced like check if the user is logged in on route change.

```js
var authRedirect = function(routeName){
  var token = localStorage.getItem('auth_token')
  if(!token){
    m.route('/login')
  }
}

mapRoutes(authRedirect, container, '/' ,{
	'/': Home,
	'/login': Login
})
```

## Documentation

##### Initialization

You must pass in your mithril `m` object to initialize the router module.
You'll then be given access to the `mapRoutes` function.

##### mapRoutes

Arguments: `( visitor: function, container: HTMLElement, initialRoute: string, routes: object )`

Calls the `visitor` function every time mithril triggers a route change.  
Your `controller` will receive the result of the visitor function as its first argument.

Works with parameterized components just fine.

The other arguments work just like [`m.route`](https://lhorie.github.io/mithril/mithril.route.html)
because this function just proxies to it.

