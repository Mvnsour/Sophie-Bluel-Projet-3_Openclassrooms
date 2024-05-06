const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";
export default class Gallery {
  constructor() {
    // initialization of
    this.works = [];
    this.container = document.querySelector(".gallery");
    this.filtersContainer = document.querySelector(".filters");
    this.categories = [];
  }

  async displayWorks(works = null) {
    this.container.innerHTML = "";
    if (works === null) {
      const response = await fetch("http://localhost:5678/api/works");
      this.works = await response.json();
      works = this.works;
    }
    for (const work of works) {
      // creating tags and give them the right proprety of the object
      const figureElement = document.createElement("figure");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = work.title;
      // target the right class/tag for nest the elements
      figureElement.appendChild(img);
      figureElement.appendChild(figcaptionElement);
      this.container.appendChild(figureElement);
    }
  }

  async displayFilters() {
    const response = await fetch("http://localhost:5678/api/categories");
    this.categories = await response.json();
    // creation of a button to display all works
    this.categories.unshift({
      id: 0,
      name: "Tous",
    });
    // creation of buttons with the right text and the right id
    for (const category of this.categories) {
      const btn = document.createElement("button");
      btn.innerText = category.name;
      btn.dataset.id = category.id;
      btn.addEventListener("click", this.onFilterClick.bind(this));
      this.filtersContainer.appendChild(btn);
    }
  }

  onFilterClick(event) {
    const categoryId = event.target.dataset.id;
    let works = this.works;
    if (categoryId > 0) {
      works = this.works.filter((work) => work.category.id == categoryId);
    }
    this.displayWorks(works);
  }
}
