// Hero Content Data
// This file allows easy management of hero timeline and awards content

export interface TimelineItem {
  side: 'left' | 'right';
  title: string;
  content: string;
}

export interface Award {
  title: string;
  description: string;
  year: number;
}

export const timelineContent: TimelineItem[] = [
  {
    side: 'left',
    title: 'PHILOSOPHY',
    content: 'Highly crafted built environments in intimate conversation with their surroundings. We believe architecture should respond to place, climate, and the human experience.'
  },
  {
    side: 'right',
    title: 'RESIDENTIAL',
    content: 'Custom homes that celebrate the unique characteristics of their sites while providing spaces for life to unfold naturally and beautifully.'
  },
  {
    side: 'left',
    title: 'DESIGN PROCESS',
    content: 'Collaborative design process that begins with deep listening. We work closely with clients to understand their vision and translate it into architectural form.'
  },
  {
    side: 'right',
    title: 'MATERIALITY',
    content: 'Careful selection of materials that age beautifully and connect occupants to the natural world through texture, color, and sustainability.'
  },
  {
    side: 'left',
    title: 'FEATURED PROJECT',
    content: 'Ocean Front Residence, Kiawah Island - A contemporary coastal home that captures ocean views while providing protection from the elements.'
  },
  {
    side: 'right',
    title: 'SUSTAINABILITY',
    content: 'Environmental stewardship through thoughtful design that minimizes impact while maximizing connection to the natural world.'
  }
];

export const awards: Award[] = [
  {
    title: 'AIA National Honor Award',
    description: 'Outstanding Achievement in Residential Design',
    year: 2023
  },
  {
    title: 'Progressive Architecture Award',
    description: 'Innovation in Sustainable Architecture',
    year: 2023
  },
  {
    title: 'Architectural Record House of the Year',
    description: 'Excellence in Custom Home Design',
    year: 2022
  },
  {
    title: 'Custom Home Design Award',
    description: 'Best Contemporary Residential Project',
    year: 2022
  },
  {
    title: 'Green Building Council Award',
    description: 'Leadership in Environmental Design',
    year: 2021
  },
  {
    title: 'Regional AIA Merit Award',
    description: 'Community Impact Through Architecture',
    year: 2021
  },
  {
    title: 'Design Excellence Award',
    description: 'Outstanding Craftsmanship and Detail',
    year: 2020
  },
  {
    title: 'Sustainable Design Recognition',
    description: 'Innovative Use of Natural Materials',
    year: 2020
  }
];