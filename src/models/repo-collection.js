import Collection from 'ampersand-rest-collection'
import Repo from './repo'
import githubMixin from '../helpers/github-mixin.js'

export default Collection.extend(githubMixin, {
	url: 'https://api.github.com/user/repos',
	
	model: Repo
})