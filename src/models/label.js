import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import xhr from 'xhr'

export default Model.extend(githubMixin, {
	idAttribute: 'name',
		
	props: {				
		name: 'string',
		color: 'string'
	},
	
	session: {
		editing: {
			type: 'boolean',
			default: false
		},
		saved: {
			type: 'boolean',
			default: true
		}
	},
	
	isNew () {
		return !this.saved;	
	},
	
	update (attributes) {
		xhr({
			url: this.url(),
			method: 'PATCH',
			json: attributes,
			headers: {
		        Authorization: 'token ' + app.me.token
		    }
		}, (err, req, body) => {
			if(err) {
				this.set(oldAttributes)
				console.error('Dude check your wifi')
			}
		})
		this.set(attributes)
	}
})