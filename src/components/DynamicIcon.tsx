import * as FaIcons from 'react-icons/fa';
import type { IconType } from 'react-icons';

type Props = {
  name: string;
  className?: string;
};

// Vykreslí ikonu z react-icons/fa podle názvu zadaného v siteData (např. "FaTruck")
const DynamicIcon = ({ name, className }: Props) => {
  const Icon = (FaIcons as Record<string, IconType | undefined>)[name];
  return Icon ? <Icon className={className} /> : null;
};

export default DynamicIcon;
