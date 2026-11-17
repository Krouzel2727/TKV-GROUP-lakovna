import { icons, type IconName } from './icons';

type Props = {
  name: IconName;
  className?: string;
};

// Vykreslí ikonu podle názvu zadaného v siteData (např. "FaTruck")
const DynamicIcon = ({ name, className }: Props) => {
  const Icon = icons[name];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
};

export default DynamicIcon;
