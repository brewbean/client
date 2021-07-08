import { cld } from './cloudinary'
import { format, quality } from '@cloudinary/base/actions/delivery'
import { auto } from '@cloudinary/base/qualifiers/format'
import { lossy } from '@cloudinary/base/qualifiers/flag'
import { autoBest, auto as qAuto } from '@cloudinary/base/qualifiers/quality'
import { scale } from '@cloudinary/base/actions/resize'

export const getCloudinaryURL = (imageName) =>
  cld
    .image(imageName)
    .delivery(format(auto()))
    .delivery(quality(qAuto()))
    .toURL()

export const Beans = cld
  .image('beans_hredk9.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const MokaPot = cld
  .image('mokapot_btrqqd.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const FrenchPress = cld
  .image('frenchpress_b8ecsx.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const Espresso = cld
  .image('espresso_sev1ld.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const Capsule = cld
  .image('capsule_tp05hi.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const Aeropress = cld
  .image('aeropress_db3fg6.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const PourOver = cld
  .image('pour_over_usakst.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const Scale = cld
  .image('scale_m94v2n.jpg')
  .delivery(format(auto()))
  .delivery(quality(autoBest()))
  .resize(scale().width(400))
  .toURL()

export const cover = {
  landscape: cld
    .image('hero_espresso_xayvsu.jpg')
    .delivery(format(auto()))
    .delivery(quality(qAuto()))
    .toURL(),
  portrait: cld
    .image('espresso_cover_nm4ww9')
    .delivery(format(auto()))
    .delivery(quality(qAuto()))
    .toURL(),
  alt: cld
    .image('coffee_cover_alt_vbifs4')
    .delivery(format(auto()))
    .delivery(quality(qAuto()))
    .toURL(),
}

export const placeholder = {
  cup: cld
    .image('coffee_cup_eehqnf')
    .delivery(format(auto()))
    .delivery(quality(autoBest()))
    .toURL(),
  recipe: cld
    .image('pour-over_sjvwlf')
    .delivery(format(auto()))
    .delivery(quality(autoBest()))
    .resize(scale().width(1000))
    .toURL(),
}

export const gif = {
  preinfusion: cld
    .image('preinfusion-no-loop_mhi9pr.gif')
    .delivery(format(auto()))
    .delivery(quality(autoBest()))
    .addFlag(lossy())
    .resize(scale().width(200))
    .toURL(),
  firstPour: cld
    .image('first-pour_nefh39.gif')
    .delivery(format(auto()))
    .delivery(quality(autoBest()))
    .addFlag(lossy())
    .resize(scale().width(200))
    .toURL(),
  secondPour: cld
    .image('second-pour_yfpyrd.gif')
    .delivery(format(auto()))
    .delivery(quality(autoBest()))
    .addFlag(lossy())
    .resize(scale().width(200))
    .toURL(),
  serve: cld
    .image('serve-no-loop_fidevw.gif')
    .delivery(format(auto()))
    .delivery(quality(autoBest()))
    .addFlag(lossy())
    .resize(scale().width(200))
    .toURL(),
}
