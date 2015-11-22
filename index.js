var m = require('mithril')

var mapRoutes = function(visitor, container, initial, routes){
	
	var noop = function(){}
	var wrapper = function(RealController){
		return function WrapController(){
			return new RealController(visitor(m.route()))
		}
	}
	
	visitor = visitor || noop
	
	Object.keys(routes)
		.forEach(function(url){
			var route = routes[url]
			var wrappedComponent = { 
				controller: wrapper(route.controller || noop), 
				view: route.view 
			}
			routes[url] = wrappedComponent  
		})
		
	return m.route(container, initial, routes)
}

module.exports = mapRoutes;

