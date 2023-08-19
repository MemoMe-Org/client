/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/kawojue/image/upload/**',
            },
            {
                protocol: 'https',
                hostname: 'd15zb4m4p46ai4.cloudfront.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
