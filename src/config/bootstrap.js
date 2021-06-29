import { router } from '@gem-mine/durex-router'
import { perfectRoute, perfectMenu } from '../util/menu'
import menus from './menu'

/**
 * 应用启动的处理工作，时机是国际化资源完成后，在 src/i18n 的入口文件被调用
 */
export default function bootstrap() {
  perfectRoute(router.getFlat())
  perfectMenu(menus)
}
