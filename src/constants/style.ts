const mediaQuerySizes = {
  TABLET_MEDIUM_MIN: 768,
}

const S = {
  mobileQuery: `@media (max-width:${mediaQuerySizes.TABLET_MEDIUM_MIN}px)`,
  printQuery: '@media print',
  transition: 'all .3s ease',
  animationTime: '.3s',
}

export default S
