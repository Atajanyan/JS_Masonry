
function MasonryPrototype(containerClassName, settings) {
  const container = document.querySelector(containerClassName);

  const columnWidth = settings.columnWidth || 200;
  const autoResize = settings.autoResize || false;
  const gap = 5;

  function positionItems() {
    const containerWidth = container.offsetWidth;

    let columns = Math.floor(containerWidth / (columnWidth + gap));

    const columnsHeight = new Array(columns).fill(0);

    const Data = [...container.children].map((child) => {
      return {
        child,
        width: columnWidth, 
        height:columnWidth *child.firstElementChild.naturalHeight/ child.firstElementChild.naturalWidth
      };
    });

    Data.forEach((el) => {
      const min = Math.min(...columnsHeight);
      const minIndex = columnsHeight.indexOf(min);

      el.child.style.width = `${el.width}px`;
      el.child.style.top = `${columnsHeight[minIndex]}px`;
      el.child.style.left = `${minIndex * columnWidth + gap * minIndex}px`;

    columnsHeight[minIndex] += el.height + gap;   
    });
  }

  positionItems();

  if (autoResize) { 
    window.addEventListener("resize", positionItems);
  } 

}

MasonryPrototype.render = function (containerClassName, settings) {
  new MasonryPrototype(containerClassName, settings);
};

window.addEventListener("DOMContentLoaded", () => {
  MasonryPrototype.render(".masonry", {
    columnWidth: 200,
    autoResize: true,
  });
});


