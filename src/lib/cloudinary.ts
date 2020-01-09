import { Cloudinary } from 'cloudinary-core'

export const cloudinary = process.env.NODE_ENV === 'production' ? Cloudinary.new({ cloud_name: 'taskr' }) : Cloudinary.new({ cloud_name: 'taskr-dev' })