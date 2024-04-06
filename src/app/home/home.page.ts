import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DatePipe } from '@angular/common';
import { Swiper } from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],

})
export class HomePage implements OnInit {

	swiperParams: SwiperOptions = {
		effect: "coverflow",
		loop: true,
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		coverflowEffect: {
			rotate: 0,
		},
	};

	swiper?: Swiper;
	days: Date[] = [];

	constructor() {
	}

	swiperReady() {
		this.swiper = new Swiper('.swiper', this.swiperParams);
	}

	ngOnInit() {
		register();
		//
		const today = new Date();
		this.getWeek(today);
	}

	getWeek(currentDate: Date) {
		this.days = [];
		this.days.push(currentDate);
	}

	onSwiperEvent(e: any) {
		const dir = e.srcElement.swiper.swipeDirection;
		const day = this.days[0];
		let date: Date;
		if (dir === 'next') {
			date = new Date(day.getTime() + 24 * 60 * 60 * 1000); // Add 1 day
		} else {
			date = new Date(day.getTime() - 24 * 60 * 60 * 1000); // Subtract 1 day
		}
		e.srcElement.swiper.removeAllSlides();
		this.getWeek(date);
	}
}