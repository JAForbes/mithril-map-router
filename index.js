function noop(){}

function map(f,o){
	return Object.keys(o)
		.reduce(function(p, k){
			p[k] = f(o[k])
			return p
		}, {})
}

module.exports = function(m){
	var mapRoutes = function(visitor, container, initial, routes){

		return m.route(
			container
			, initial
			, map(function(route){

				var RealController = route.controller || noop

				var options = {
					onunload: noop
				}

				var controller = function WrapController(){


					var instance = new RealController(visitor(m.route(), options))

					var instance_onunload = instance.onunload || noop

					instance.onunload = function(){
						instance_onunload.apply(this, arguments)
						options.onunload.apply(this, arguments)
					}

					return instance
				}

				return {
					controller,
					view: route.view
				}

			}, routes)
		)
	}

	return mapRoutes
}

