/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async rewrites() {
    return [
      // County Pages
      { source: '/adams-county-home-care', destination: '/areas-we-serve/adams' },
      { source: '/cumberland-county-home-care', destination: '/areas-we-serve/cumberland' },
      { source: '/dauphin-county-home-care', destination: '/areas-we-serve/dauphin' },
      { source: '/lancaster-county-home-care', destination: '/areas-we-serve/lancaster' },
      { source: '/lebanon-county-home-care', destination: '/areas-we-serve/lebanon' },
      { source: '/perry-county-home-care', destination: '/areas-we-serve/perry' },
      { source: '/york-county-home-care', destination: '/areas-we-serve/york' },
      { source: '/berks-county-home-care', destination: '/areas-we-serve/berks' },
      { source: '/lehigh-county-home-care', destination: '/areas-we-serve/lehigh' },
      { source: '/northampton-county-home-care', destination: '/areas-we-serve/northampton' },

      // City Pages
      { source: '/york-pa-home-care', destination: '/areas-we-serve/york?city=york' },
      { source: '/lancaster-pa-home-care', destination: '/areas-we-serve/lancaster?city=lancaster' },
      { source: '/reading-pa-home-care', destination: '/areas-we-serve/berks?city=reading' },
      { source: '/allentown-pa-home-care', destination: '/areas-we-serve/lehigh?city=allentown' },
      { source: '/bethlehem-pa-home-care', destination: '/areas-we-serve/northampton?city=bethlehem' },
      { source: '/harrisburg-pa-home-care', destination: '/areas-we-serve/dauphin?city=harrisburg' },
      { source: '/mechanicsburg-pa-home-care', destination: '/areas-we-serve/cumberland?city=mechanicsburg' },
      { source: '/carlisle-pa-home-care', destination: '/areas-we-serve/cumberland?city=carlisle' },
      { source: '/gettysburg-pa-home-care', destination: '/areas-we-serve/adams?city=gettysburg' },
      { source: '/hershey-pa-home-care', destination: '/areas-we-serve/dauphin?city=hershey' },

      // Service Pages
      { source: '/companion-care', destination: '/services?service=companion-care' },
      { source: '/personal-care', destination: '/services?service=personal-care' },
      { source: '/24-hour-live-in-care', destination: '/services?service=24hour-care' },
      { source: '/dementia-alzheimers-care', destination: '/services?service=dementia-care' },
      { source: '/post-hospital-respite-care', destination: '/services?service=respite-care' },

      // Blog Pages
      { source: '/medicaid-home-care-pennsylvania', destination: '/blog/medicaid-waiver-programs-pa' },
      { source: '/home-care-cost-pennsylvania', destination: '/blog/home-care-cost-pennsylvania' },
      { source: '/home-care-vs-assisted-living', destination: '/blog/home-care-vs-assisted-living' },
      { source: '/find-caregiver-for-parent-pa', destination: '/blog/choosing-a-home-care-agency' },
    ];
  },
};

export default nextConfig;

