import { Component } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

import { WordpressService } from '../shared/services/wordpress.service';

@Component({
	templateUrl: './wordpress-page.html',
	providers: [ WordpressService ]
})
export class WordpressPage {
	page: any;
	// paage: any;

	constructor(
			private navParams: NavParams,
			private wordpressService: WordpressService,
			private loadingController: LoadingController,
			private iab: InAppBrowser,
			private socialSharing: SocialSharing
		) {
		if (navParams.get('page')) {
			this.page = navParams.get('page');
		}

		if (navParams.get('id')) {
			this.getPage(navParams.get('id'));
		}

		// if (navParams.get('featured_media')){
		//   this.getFeaturedMedia('featured_media');
    // }

    // if (navParams.get('paage')){
    //   this.paage = navParams.get('paage');
    // }

	}

	getPage(id) {
		let loader = this.loadingController.create({
			content: "Chargement en cours"
		});

		loader.present();
		this.wordpressService.getPage(id)
		.subscribe(result => {
			this.page = result;
		},
		error => console.log(error),
    () => loader.dismiss());
	}

	// getFeaturedMedia(id){
	//
	//
	//
	//
	//
  // }

	previewPage() {
		const browser = this.iab.create(this.page.link, '_blank');
		browser.show();
	}

	sharePage() {
		let subject = this.page.title.rendered;
		let message = this.page.content.rendered;
		message = message.replace(/(<([^>]+)>)/ig,"");
		let url = this.page.link;
		this.socialSharing.share(message, subject, '', url);
	}

}
