// Hero Images Configuration
// This file allows easy management of hero slideshow images

export interface HeroImage {
  src: string;
  alt: string;
  caption?: string;
}

export const heroImages: HeroImage[] = [
  {
    src: '/projects/6kiawah/3_Ocean_Front_Residence_high_res_Pool_Deck_Lounge.jpg',
    alt: 'Ocean Front Residence Pool Deck',
    caption: 'Kiawah Island Ocean Front Residence'
  },
  {
    src: '/projects/6kiawah/1_Ocean_Front_Residence_high_res_Ext_Court.jpg',
    alt: 'Ocean Front Residence Exterior',
    caption: 'Architectural Excellence in Design'
  },
  {
    src: '/projects/6kiawah/4_Ocean_Front_Residence_high_res_Terrace_View.jpg',
    alt: 'Ocean Front Residence Terrace',
    caption: 'Seamless Indoor-Outdoor Living'
  },
  {
    src: '/projects/6kiawah/7_Ocean_Front_Residence_high_res_Pool_Deck_With_Ocean.jpg',
    alt: 'Ocean Front Residence Pool with Ocean View',
    caption: 'Luxury Coastal Architecture'
  },
  {
    src: '/projects/6kiawah/8_Ocean_Front_Residence_high_res_Entry_Stair_and_Tower.jpg',
    alt: 'Ocean Front Residence Entry',
    caption: 'Modern Architectural Details'
  }
];

export const heroConfig = {
  autoAdvanceInterval: 5000, // 5 seconds
  transitionDuration: 1500,   // 1.5 seconds
  showDots: true,
  showScrollIndicator: true,
  overlayOpacity: 0.4
};