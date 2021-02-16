import { Cloudinary } from '@cloudinary/base'

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'brewbean',
  },
  url: {
    secure: true,
  },
})