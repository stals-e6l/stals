import LogoWhite from './Images/Logo_White.png'
import LogoGreen from './Images/Logo_Green.png'
import Banner from './Images/BannerFlipped2.jpg'
import Banner2 from './Images/Banner.jpg'
import { faker } from '@faker-js/faker'

export default {
  logoWhite: LogoWhite,
  logoGreen: LogoGreen,
  banner: Banner,
  banner2: Banner2,
  defaultAvatar: faker.image.avatar(),
}
