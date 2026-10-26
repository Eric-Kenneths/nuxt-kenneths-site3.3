// composables/useCart.js
import { retailGlobal } from '~/composables/retailGlobal';
import { useLocalStorage } from '~/composables/useLocalStorage';

export function useCart() {
  const { getWebOrderRetailCartId, setWebOrderRetailCartId } = useLocalStorage();

  /**
   * Ensure there is an active cart.
   * Returns a numeric cartId or 0.
   */
  const ensureCart = async (technicianId = 0) => {
    let cartId = await getWebOrderRetailCartId();

    if (!cartId || cartId === 0) {
      // Initialize a new cart
      cartId = await retailGlobal.webRetailInitialize(0, technicianId);

      // Persist whatever came back (0 or real ID)
      await setWebOrderRetailCartId(cartId || 0);
    }

    return cartId || 0;
  };

  /**
   * Add a single line item to the cart.
   * Expects: { itemCode: number, quantity: number, technicianId?: number }
   */
  const addToCart = async ({ itemCode, quantity = 1, technicianId = 0 }) => {
    if (!itemCode) {
      throw new Error('addToCart: missing itemCode');
    }

    const techId =
      technicianId && technicianId > 0
        ? technicianId
        : retailGlobal.linkedTechnician?.techId || 0;

    const cartId = await ensureCart(techId);

    if (!cartId || cartId === 0) {
      throw new Error('Cart initialization failed (cartId = 0)');
    }

    await retailGlobal.postWebOrderRetail(cartId, itemCode, quantity, '0');
    await retailGlobal.refreshRetailSession();

    // open cart drawer
    retailGlobal.cart.visible = true;

    return cartId;
  };

  const refreshCart = async () => {
    await retailGlobal.refreshRetailSession();
  };

  return {
    ensureCart,
    addToCart,
    refreshCart,
  };
}
