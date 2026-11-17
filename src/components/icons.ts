import {
  FaArrowsAltH,
  FaArrowsAltV,
  FaExpandAlt,
  FaLayerGroup,
  FaPalette,
  FaShieldAlt,
  FaSprayCan,
  FaTemperatureHigh,
  FaTruck,
  FaUsers,
  FaWeightHanging,
} from 'react-icons/fa';

/**
 * Ikony použitelné v siteData.ts.
 * Novou ikonu přidáte importem z 'react-icons/fa' a zápisem do tohoto seznamu
 * (přehled: https://react-icons.github.io/react-icons/icons/fa/).
 * Do webu se tak přibalí jen použité ikony, ne celá knihovna.
 */
export const icons = {
  FaArrowsAltH,
  FaArrowsAltV,
  FaExpandAlt,
  FaLayerGroup,
  FaPalette,
  FaShieldAlt,
  FaSprayCan,
  FaTemperatureHigh,
  FaTruck,
  FaUsers,
  FaWeightHanging,
};

export type IconName = keyof typeof icons;
