interface IOptions {
  multiple?: boolean;
  activeClassName?: string;
}

export default class Bandoneon {
  private readonly itemSelector: string;
  private readonly triggerSelector: string;
  private readonly options?: IOptions;
  private readonly elements: NodeListOf<Element>;
  private activeClassName = 'is-active';

  public constructor(itemSelector: string, triggerSelector: string, options?: IOptions) {
    this.itemSelector = itemSelector;
    this.triggerSelector = triggerSelector;
    this.options = options;
    this.elements = document.body.querySelectorAll(itemSelector);
  }

  public setActiveClassName(className: string) {
    this.activeClassName = className;

    return new Bandoneon(this.itemSelector, this.triggerSelector, this.options);
  }

  public activate() {
    this.elements.forEach(element => {
      const trigger = element.querySelector(this.triggerSelector);
      trigger?.addEventListener('click', () => {
        if (!this.options?.multiple) {
          this.elements.forEach(removingElement => {
            if (removingElement === element) {
              return;
            }

            removingElement.classList.remove(this.activeClassName);
          });
        }

        element.classList.toggle(this.activeClassName);
      });
    });
  }
}
