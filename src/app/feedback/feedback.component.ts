import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  carousel: HTMLElement | null = null;
  content: HTMLElement | null = null;
  next: HTMLElement | null = null;
  prev: HTMLElement | null = null;
  wrapper: HTMLElement | null = null;
  items: HTMLCollectionOf<HTMLElement> | null = null;
  currentItem = 0;
  itemsShown = 3
  itemWidth = 340;
  itemCount = 6;
  dotsArray = [0, 1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.carousel = document.getElementById("carousel");
    this.content = document.getElementById("content");
    this.wrapper = document.getElementById("wrapper");
    this.items = this.carousel!.getElementsByClassName("item") as HTMLCollectionOf<HTMLElement>;
    this.next = document.getElementById("next");
    this.prev = document.getElementById("prev");

    this.next!.addEventListener("click", e => {
      this.setCurrentItem(this.currentItem + 1);
    });

    this.prev!.addEventListener("click", e => {
      this.setCurrentItem(this.currentItem - 1);
    });

    window.addEventListener("resize", e => {
      this.resizeWindow();
    });

    this.resizeWindow();
  }

  resizeWindow() {
    if (window.innerWidth >= 1300) {
      this.itemWidth = 340;
      this.itemsShown = 3;
    }
    else if (window.innerWidth >= 768) {
      this.itemWidth = 340;
      this.itemsShown = 2;
    }
    else {
      this.itemWidth = 300;
      this.itemsShown = 1;
    }
    this.wrapper!.style.maxWidth = (this.itemsShown * this.itemWidth) + 'px';
    this.dotsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, this.itemCount - this.itemsShown + 1);
    if(this.currentItem >= this.dotsArray.length) this.currentItem = this.dotsArray.length - 1;
    this.setCurrentItem(this.currentItem);
  }

  setCurrentItem(item: number) {
    if (item < 0 || item >= this.itemCount) return;
    this.carousel!.scrollTo(this.itemWidth * item, 0);
    this.currentItem = item;
    this.setArrows(this.currentItem)
    this.content!.style.height = window.innerWidth < 768 ? this.items![this.currentItem].offsetHeight+'px' : "auto";
  }

  setArrows(item: number) {
    if (window.innerWidth >= 768) {
      this.prev!.style.display = item == 0 ? "none" : "flex";
      this.next!.style.display = item >= this.itemCount - this.itemsShown ? "none" : "flex";
    } else {
      this.prev!.style.display = "none";
      this.next!.style.display = "none";
    }
  }

}
