/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['res.cloudinary.com', 'localhost', 'picsum.photos'] // <== Domain name
    }
}

module.exports = nextConfig
