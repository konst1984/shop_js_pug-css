export class DropdownList {
  constructor(selector, trigger) {
    this.listContainer = document?.querySelector(selector);
    this.list = this.listContainer?.querySelector("ul");
    this.listItems = this.listContainer?.querySelectorAll("li");

    this.listContainer?.addEventListener("click", (e) => {
      if (e.target.closest(trigger)) {
        this.toggleClass(this.list, "active");
      } else {
        this.removeClass(this.list, "active");
      }
      this.setActiveClassForListItem();
    });
  }

  addClass(item, classname) {
    item.classList.add(classname);
  }
  toggleClass(item, classname) {
    item.classList.toggle(classname);
  }
  removeClass(item, classname) {
    item.classList.remove(classname);
  }

  setActiveClassForListItem() {
    if (!this.listContainer) return;
    this.listItems.forEach((li) => {
      li.addEventListener("click", (e) => {
        const item = e.currentTarget;
        if (li !== item) {
          this.removeClass(li, "active");
        } else {
          this.addClass(li, "active");
          this.removeClass(this.list, "active");
        }
      });
    });
  }
}
