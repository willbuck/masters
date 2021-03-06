import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import LabelItem from '../components/label-item.js'

export default React.createClass({
	displayName: 'RepoDetail',
	mixins: [ampersandMixin],
	
	onAddClick () {
		this.props.labels.add({
			name: '',
			color: '',
			editing: true,
			saved: false
		}, {at: 0})	
	},
	
	render () {
		const {repo, labels} = this.props
		
		return (
			<div className='container'>
			  <h1>{repo.full_name}</h1>
			  <p>
			  	<button onClick={this.onAddClick} className='button'>Add New</button>
			  </p>
			  <ul>
			  	{labels.map((label) =>  
					<LabelItem key={label.name} label={label}/>
				)}
			  </ul>
			</div>
		)
	}
})