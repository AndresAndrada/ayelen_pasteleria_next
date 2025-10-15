"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart/cart.store";
import { CartItem } from "@/lib/types";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import Link from "next/link";

interface ShoppingCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCartPopup({
  isOpen,
  onClose,
}: ShoppingCartPopupProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`.overlay`}>
      <div
        className={`.popup`}
        role="dialog"
        aria-label="Carrito de compras"
        ref={popupRef}
      >
        <div className={`.header`}>
          <h2 className={`.title`}>Mi Carrito</h2>
          <button
            className={`.closeButton`}
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>
        {items.length === 0 ? (
          <div className={`.emptyState`}>
            <div className={`.emptyIcon`}>
              <FaShoppingCart size={"20px"} />
            </div>
            <p className={`.empty`}>El carrito está vacío</p>
          </div>
        ) : (
          <div className={`.items`}>
            {items.map((item: CartItem) => (
              <div key={item.id} className={`.item`}>
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  width={50}
                  height={50}
                  className={`.itemImage`}
                />
                <div className={`.itemDetails`}>
                  <h3 className={`.itemTitle`}>{item.titulo}</h3>
                  <p className={`.itemPrice`}>
                    ${item.precio} x {item.quantity}
                  </p>
                  <p className={`.itemSubtotal`}>
                    Subtotal: ${(item.precio * item.quantity).toFixed(2)}
                  </p>
                  <div className={`.quantityControls`}>
                    <button
                      className={`.quantityButton`}
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      aria-label={`Reducir cantidad de ${item.titulo}`}
                    >
                      -
                    </button>
                    <span className={`.quantity`}>{item.quantity}</span>
                    <button
                      className={`.quantityButton`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Aumentar cantidad de ${item.titulo}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={`.removeButton`}
                  onClick={() => {
                    removeItem(item.id);
                    toast.success("Producto eliminado del carrito", {
                      duration: 4000,
                      position: "top-center",
                    });
                  }}
                  aria-label={`Eliminar ${item.titulo} del carrito`}
                >
                  <MdDeleteForever size={"30px"} />
                </button>
              </div>
            ))}
            <div className={`.total`}>
              <Link href={"/payment"} className={`.linkButton`}>
                Ir al carrito
              </Link>
              <p>Total: ${getTotal().toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
