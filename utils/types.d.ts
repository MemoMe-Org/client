interface Icons {
  className?: string;
}

interface NavLinkProps {
  href: string;
  children: ({ isActive }: { isActive: boolean }) => React.ReactNode;
}

interface ShowWhenVisibleProps {
  children?: React.ReactNode;
  animateClass?: string;
  className?: string;
  threshold?: number;
  onVisible?: () => void;
  onInvisible?: () => void;
}
