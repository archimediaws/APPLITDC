import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: 'settings.html'
})
export class SettingsComponent {

	language: string;

	constructor(
		private storage: Storage,
		private translate: TranslateService
		){}

	ngOnInit() {
	    this.storage.get('langage')
	    .then(value => {
	        if(value) {
	        	this.language = value;
	        } else {
	        	this.language = 'fr';
	        }
	    });
	}

	selectLanguage() {
		this.storage.set('langage', this.language);
        this.translate.setDefaultLang(this.language);
        this.translate.use(this.language);
	}

}


