# mithril-map-router
Map over route changes like you map over arrays!


#### Getting start

`npm install mithril-map-router`

Now let's give very route access to a `data` object for shared context.
Easy with ramda's `R.always`.

```
var R = require('ramda');
var m = require('mithril')
var mapRoutes = require('mithril-map-router')

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

```
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

##### mapRoutes

Arguments: `( visitor: function, container: HTMLElement, initialRoute: string, routes: object )`

Calls the `visitor` function every time mithril triggers a route change.  Everything else works just like [`m.route`](https://lhorie.github.io/mithril/mithril.route.html)
