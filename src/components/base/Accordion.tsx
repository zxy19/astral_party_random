import m, { ClassComponent, Vnode, Children } from 'mithril';

interface AccordionAttrs {
  id: string;
  titleGetter: (idx: number) => string
}

export class Accordion implements ClassComponent<AccordionAttrs> {
  view({ attrs, children }: Vnode<AccordionAttrs>) {
    const { id } = attrs;

    // 将子元素包装成手风琴项
    const childArray = Array.isArray(children) ? children : [children];
    const accordionItems = childArray.map((child, index) => {
      if (child === null || child === undefined) {
        return null;
      }

      return this.renderAccordionItem(child, id, index, attrs.titleGetter(index));
    }).filter(item => item !== null);

    return (
      <div className="accordion mt-3" id={id}>
        {accordionItems}
      </div>
    );
  }

  private renderAccordionItem(content: Children, parentId: string, index: number, title: string) {
    const itemId = `${parentId}-item-${index}`;
    const headingId = `${itemId}-heading`;
    const collapseId = `${itemId}-collapse`;

    // 第一个面板默认展开
    const isFirst = index === 0;
    const collapsedClass = isFirst ? '' : ' collapsed';
    const collapseClass = isFirst ? ' show' : '';
    const ariaExpanded = isFirst ? 'true' : 'false';

    return (
      <div className="accordion-item" key={index}>
        <h2 className="accordion-header" id={headingId}>
          <button
            className={`accordion-button${collapsedClass}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-controls={collapseId}
          >
            {title}
          </button>
        </h2>
        <div
          id={collapseId}
          className={`accordion-collapse collapse${collapseClass}`}
          aria-labelledby={headingId}
          data-bs-parent={`#${parentId}`}
        >
          <div className="accordion-body">
            {content}
          </div>
        </div>
      </div>
    );
  }
}