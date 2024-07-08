/**
 * Represents the different type of loading indicators.
 *
 * @typedef {'spinner' | 'skeleton'} LoadingTypes
 * @property {'spinner'} SPINNER - A circular spinner indicator, ideal for buttons or smaller elements.
 * @property {'skeleton'} SKELETON - A skeleton placeholder that mimics the structure of content while its loading.
 * @property {'homeScreen'} homeScreen - A home screen loading indiactor, ideal for refresh or changing to new page.
 */

export type LoadingTypes = "spinner" | "skeleton" | "homeScreen";
