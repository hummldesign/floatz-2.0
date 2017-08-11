![](https://github.com/floatzcss/floatz/blob/master/wiki/logo.png) floatz 2.0 (alpha)
======
> Under construction. In the meantime please refer to https://github.com/floatzcss/floatz

## Core - cheat sheet

```
// Core modules
floatz.core.reset.less
floatz.core.mixins.less
floatz.core.layout.less
floatz.core.layout.responsive.less
floatz.core.layout.responsive.debug.less

// Core module bundles
floatz.core.less
floatz.core.debug.less

// Core variables
@flz-var-base-font-size
@flz-var-gutter-text-x
@flz-var-gutter-text-y
@flz-var-gutter-layout-x
@flz-var-gutter-layout-y

// Core layout mixins
.flz-mx-box
.flz-mx-baseline-layout
.flz-mx-baseline-text
.flz-mx-debug-responsive
.flz-mx-enwrap
.flz-mx-layout

// Core utility mixins
.flz-mx-border-radius
.flz-mx-box-sizing
.flz-mx-shadow
.flz-mx-transform

// Core classes
.flz-box
.flz-scrollbox
.flz-clear[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-hide[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-5[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-10[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-15[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-20[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-25[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-30[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-33[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-35[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-40[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-45[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-50[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-55[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-60[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-65[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-66[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-70[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-75[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-80[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-85[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-90[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-95[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-100[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-spacer[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz_nospacer[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
.flz-nospacer[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]

// Core media query variables
@flz-media[[-lte]-xxl|[-lte|-gte]-xl|[-lte|-gte]-l|[-lte|-gte]-m|[-lte|-gte]-s|[-lte|-gte]-xs|[-gte]-xxs]
@flz-media-portrait
@flz-media-landscape
@flz-media-2x
@flz-media-3x
```
