/// <reference path="../typings/react/react.d.ts" />
import app from 'ampersand-app'
import Router from 'ampersand-router'
import HomePage from './pages/home'
import ReposPage from './pages/repos'
import Layout from './layout'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'

export default Router.extend({
	renderPage (page, opts = {layout: true}) {
		if(opts.layout) {
			page = (
				<Layout me={app.me}>
					{page}
				</Layout>
			)
		}		
		React.render(page, document.body)
	},
	
	routes: {
		'': 'home',
		'repos': 'repos',
		'login': 'login',
		'logout': 'logout',
		'auth/callback?:query': 'authCallback'		
	},
		
	home () {		
		this.renderPage(<HomePage/>, {layout: false})
	},
	
	repos () {		
		this.renderPage(<ReposPage/>)
	},
	
	login () {
		window.location  = 'https://github.com/login/oauth/authorize?' + qs.stringify({
		  scope: 'user,repo',
		  redirect_uri: window.location.origin + '/auth/callback',
		  client_id: 'c19515e6140b9844ab8b'
		}) 
		
	},
	
	logout () {
		window.localStorage.clear()
		window.location = '/'
	},
	
	authCallback (query) {
		query = qs.parse(query)		
		
		xhr({
			url: 'https://wbspadeconstruct.herokuapp.com/authenticate/' + query.code,
			json: true
		}, (error, request, body) => {			
			app.me.token = body.token
			this.redirectTo('/repos')
		})
	}
	
})