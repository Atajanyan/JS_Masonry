function MasonryPrototype() {}

MasonryPrototype.prototype.render = function (containerClassName, settings) {
  
  this.container = document.querySelector(containerClassName);
  this.columnWidth = settings.columnWidth || 200;
  this.autoResize = settings.autoResize || false;
  this.gap = 5;

  this.positionItems();

  if (this.autoResize) {
    window.addEventListener("resize", this.positionItems.bind(this));
  }
};

MasonryPrototype.prototype.positionItems = function () {
  const containerWidth = this.container.offsetWidth;

  let columns = Math.floor(containerWidth / (this.columnWidth + this.gap));

  const columnsHeight = new Array(columns).fill(0);
  [...this.container.children].forEach((child) => {
    const min = Math.min(...columnsHeight);
    const minIndex = columnsHeight.indexOf(min);
    let height =
      (this.columnWidth * child.firstElementChild.naturalHeight) /
      child.firstElementChild.naturalWidth;

    child.style.width = `${this.columnWidth}px`;
    child.style.top = `${columnsHeight[minIndex]}px`;
    child.style.left = `${minIndex * this.columnWidth + this.gap * minIndex}px`;
    columnsHeight[minIndex] += height + this.gap;
  });
};

let Masonry = new MasonryPrototype();
window.addEventListener("DOMContentLoaded", () => {
  Masonry.render(".masonry", {
    columnWidth: 200,
    autoResize: true,
  });
});
