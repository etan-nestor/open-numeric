// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     remotePatterns: [
//       // ✅ Autoriser les images de Pinterest (utilisé pour les avatars)
//       {
//         protocol: 'https',
//         hostname: 'i.pinimg.com',
//         pathname: '/**',
//       },
//       // ✅ Autoriser les images de GitHub (avatars des utilisateurs)
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//         pathname: '/**',
//       },
//       // ✅ Autoriser les images de Google (avatars, photos)
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         pathname: '/**',
//       },
//       // ✅ Autoriser les images d'Unsplash (photos libres)
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         pathname: '/**',
//       },
//       // ✅ Autoriser les images de Freepik (icônes, illustrations)
//       {
//         protocol: 'https',
//         hostname: 'img.freepik.com',
//         pathname: '/**',
//       },
//       // ✅ Autoriser les images de Pixabay (photos libres)
//       {
//         protocol: 'https',
//         hostname: 'cdn.pixabay.com',
//         pathname: '/**',
//       },
//       // ✅ Autoriser les images de Google (static)
//       {
//         protocol: 'https',
//         hostname: 'encrypted-tbn0.gstatic.com',
//         pathname: '/**',
//       },
//       // ✅ Autoriser les images de Facebook
//       {
//         protocol: 'https',
//         hostname: 'platform-lookaside.fbsbx.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'scontent.xx.fbcdn.net',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;