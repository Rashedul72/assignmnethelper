import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BDJHelper - Assignment Help & Academic Writing Service',
    short_name: 'BDJHelper',
    description: 'Expert assignment help, dissertation writing, research papers, proposals, posters, and reports. Free Turnitin AI & similarity reports.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#21616A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

