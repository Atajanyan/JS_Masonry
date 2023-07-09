
function MasonryPrototype(containerClass, settings) {

  const container = document.querySelector(containerClass);
  const columnWidth = settings.columnWidth || 200;
  const autoResize = settings.autoResize || false;
  const gap = 5;

  function positionItems() {
    const containerWidth = container.offsetWidth;
    const columns = Math.floor(containerWidth / (columnWidth + gap));
    let padding = 0;

    if (!autoResize) {
      padding = (containerWidth - columns * (columnWidth + gap)) / 2;
    }

    container.style.columnCount = `${columns}`;
    container.style.columnWidth = columnWidth + "px";
    container.style.paddingInline = padding + "px";
    container.style.columnGap = gap + "px";
  }

  positionItems();

  window.addEventListener("resize", positionItems);
}


MasonryPrototype.render = function (containerClass, settings) {
  new MasonryPrototype(containerClass, settings);
};


window.addEventListener("DOMContentLoaded", () => {
  MasonryPrototype.render(".masonry", {
    columnWidth: 200,
    // autoResize: true,
  });
});
