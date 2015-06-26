import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import LabelItem from '../components/label-item.js'

export default React.createClass({
	displayName: 'RepoDetail',
	mixins: [ampersandMixin],
	
	render () {
		const {repo, labels} = this.props
		
		return (
			<div className='container'>
			  <h1>{repo.full_name}</h1>
			  <p></p>
			  <ul>
			  	{labels.map((label) =>  
					<LabelItem key={label.name} label={label}/>
				)}
			  </ul>
			</div>
		)
	}
})