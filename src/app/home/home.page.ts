import{Component,ViewChild,OnInit,ElementRef,AfterViewInit}from'@angular/core';import{register}from'swiper/element/bundle';import{DatePipe}from'@angular/common';import{Swiper}from'swiper';import{SwiperContainer}from'swiper/element';import{SwiperOptions}from'swiper/types';import{inject}from"@angular/core";import{map}from'rxjs/operators';import{HttpClient}from'@angular/common/http';

@Component
({selector:'app-home',templateUrl:'home.page.html',styleUrls:['home.page.scss'],

})export class HomePage implements OnInit {

	persone:any=
	{
		"userId": 0,
		"id": 0,
		"title": "",
		"body": ""
	};

	id:number=20;url="https://jsonplaceholder.typicode.com/posts/";

	swiper?:Swiper;swiperParams:SwiperOptions=
	{
		initialSlide: 1,
		slidesPerView: 1,
		spaceBetween: 20,
		autoplay: {
			delay: 2000,
		}
	};

	data:any[]=[];http=

	inject(HttpClient);

	constructor() {
	}

	swiperReady() {
		this.swiper = new Swiper('.swiper', this.swiperParams);
		console.log("swiper ready");
	}

	ngOnInit() {
		register();
		//
		this.getWeek(this.id);
	}

	onSlideChange() {
		    console.log(this.swiper?.activeIndex);
		}

	getWeek(id: number) {
		this.http.get(this.url + id).pipe(map((data: any) => {
			this.persone = data;
			this.data = [];
			this.data.push(this.persone);
		})).subscribe();
	}

	swiperslidechange(e: any) {
		//let x : number = e.detail[1].changedTouches[0].clientX;
		//console.log(e.detail[1].changedTouches[0].clientX);
		const dir = e.srcElement.swiper.swipeDirection;
		if (dir == 'next') {
			this.id = this.id + 1; 
		} else {
			this.id = this.id - 1;
		}
		e.srcElement.swiper.removeAllSlides();
		this.getWeek(this.id);
	}
}