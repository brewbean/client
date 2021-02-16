import { Cloudinary } from '@cloudinary/base'
import { quality } from '@cloudinary/base/actions/delivery'
import { auto as qAuto } from '@cloudinary/base/qualifiers/quality'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'brewbean',
  },
})

const imageConvert = (publicId) => {
  let newImage = cld.image(publicId)
  newImage.delivery(quality(qAuto()))
  return newImage.toURL()
}

export const Beans = imageConvert('beans_hredk9.jpg')
export const PourOver = imageConvert('pour_over_usakst.jpg')
export const Scale = imageConvert('scale_m94v2n.jpg')
export const CoffeeCover = imageConvert('hero_espresso_xayvsu.jpg')
