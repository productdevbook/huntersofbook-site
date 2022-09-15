import Plausible from 'plausible-tracker'
import type { PlausibleOptions } from 'plausible-tracker'
import { App, inject } from 'vue'

export interface OptionPlugin {
  init: PlausibleOptions
  settings: InstallOptions
}

export interface InstallOptions {
  /**
   * Enables automatic page view tracking for SPAs
   * @default false
   * @see https://github.com/plausible/plausible-tracker
   *
  */
  enableAutoPageviews?: boolean
  /**
   * Outbound link click tracking
   * @default false
   * @see https://plausible.io/docs/outbound-link-click-tracking
   *
  */
  enableAutoOutboundTracking?: boolean
}

export const createPlausible = (options: OptionPlugin) => {
  const plausible = {
    install(app: App): void {
      const plausible = Plausible(options.init)

      if (options.settings.enableAutoPageviews === true)
        plausible.enableAutoPageviews()

      if (options.settings.enableAutoOutboundTracking === true)
        plausible.enableAutoOutboundTracking()

      app.config.globalProperties.$plausible = plausible
      app.provide('$plausible', plausible)
    },
  }
  return plausible
}

export const usePlausible = () => {
  const plausible = inject('$plausible') as Omit<ReturnType<typeof Plausible>, 'enableAutoPageviews' | 'enableAutoOutboundTracking'>

  return {
    ...plausible,
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $plausible: ReturnType<typeof Plausible>
  }
}