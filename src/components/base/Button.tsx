import m, { ClassComponent, Vnode } from 'mithril';

interface ButtonAttrs {
  onclick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export class Button implements ClassComponent<ButtonAttrs> {
  view({ attrs,children }: Vnode<ButtonAttrs>) {
    const {
      onclick,
      variant = 'primary',
      size = 'md',
      disabled = false,
      block = false,
      className = '',
      type = 'button'
    } = attrs;

    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';
    const disabledClass = disabled ? 'disabled' : '';
    const blockClass = block ? 'd-block w-100' : '';

    return (
      <button
        type={type}
        className={`btn ${variantClass} ${sizeClass} ${disabledClass} ${className} ${blockClass}`.trim()}
        onclick={onclick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}