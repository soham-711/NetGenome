/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as addPurchased from "../addPurchased.js";
import type * as addToCart from "../addToCart.js";
import type * as clearCart from "../clearCart.js";
import type * as deletePurchase from "../deletePurchase.js";
import type * as getCartItems from "../getCartItems.js";
import type * as getPurchase from "../getPurchase.js";
import type * as hasPurchased from "../hasPurchased.js";
import type * as matched from "../matched.js";
import type * as removeFromCart from "../removeFromCart.js";
import type * as seedArtists from "../seedArtists.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  addPurchased: typeof addPurchased;
  addToCart: typeof addToCart;
  clearCart: typeof clearCart;
  deletePurchase: typeof deletePurchase;
  getCartItems: typeof getCartItems;
  getPurchase: typeof getPurchase;
  hasPurchased: typeof hasPurchased;
  matched: typeof matched;
  removeFromCart: typeof removeFromCart;
  seedArtists: typeof seedArtists;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
