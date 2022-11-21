interface Props {
  href: string;
  children: HTMLElement | string;
  selected?: boolean;
  onClick?: (e: Event) => void;
}

export default function A(props: Props) {
  const path = location?.pathname;
  const selected = props.href === path ? "selected" : undefined;

  return (
    <li class={selected}>
      <a href={props.href} onClick={props.onClick} >
        {props.children}
      </a>
    </li>
  );
}
