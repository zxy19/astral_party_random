import m, { ClassComponent, Vnode } from 'mithril';

interface CardAttrs {
  title?: string,
  children: m.Children,
  className: string,
  collapsible?: boolean
}

export class Card implements ClassComponent<CardAttrs> {
  private isCollapsed: boolean = false;

  toggleCollapse = () => {
    this.isCollapsed = !this.isCollapsed;
    m.redraw();
  }

  view({ attrs, children }: Vnode<CardAttrs>) {
    const { title, collapsible } = attrs;
    const showCollapseToggle = collapsible && title;

    return (
      <div className={"card "+ (this.isCollapsed?"card-block-collapsed":"") + (attrs.className || "")}>
        <div className="card-body">
          {title && (
            <h5
              className={`card-title section-title text-left ${showCollapseToggle ? "collapsible-card-title" : ""} ${this.isCollapsed ? 'card-title-collapsed' : ''}`}
              onclick={showCollapseToggle ? this.toggleCollapse : undefined}
            >
              {title}
            </h5>
          )}
          <div className={this.isCollapsed ? "card-content card-collapsed" : "card-content"}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}