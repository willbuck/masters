/// <reference path="../typings/react/react.d.ts" />
import app from 'ampersand-app'
import Router from 'ampersand-router'
import HomePage from './pages/home'
import ReposPage from './pages/repos'
import RepoDetailPage from './pages/repo-detail'
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
		'repo/:owner/:name': 'repoDetail',
		'auth/callback?:query': 'authCallback'		
	},
		
	home () {		
		this.renderPage(<HomePage/>, {layout: false})
	},
	
	repos () {		
		this.renderPage(<ReposPage repos={app.me.repos}/>)
	},
	
	repoDetail (owner, name) {
		const repo = app.me.repos.getByFullName(owner + '/' + name)
		const labels = app.me.repos.getByFullName(owner + '/' + name)
		
		this.renderPage(<RepoDetailPage repo={repo}/>)
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