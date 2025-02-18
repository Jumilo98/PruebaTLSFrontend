import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { usePopper } from "react-popper";

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  btnClassName?: string;
  placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end";
  offset?: [number, number];
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ button, children, btnClassName = "", placement = "bottom-end", offset = [0, 8] }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const referenceRef = useRef<HTMLButtonElement | null>(null);
    const popperRef = useRef<HTMLDivElement | null>(null);

    // Configuración de Popper.js
    const { styles, attributes, update } = usePopper(referenceRef.current, popperRef.current, {
      placement,
      strategy: "absolute", // Para evitar problemas de posición inicial
      modifiers: [
        { name: "offset", options: { offset } },
        { name: "preventOverflow", options: { boundary: "clippingParents" } }, // Cambio aquí
        { name: "flip", options: { fallbackPlacements: ["top", "right", "left"] } },
      ],
    });

    // Cierra el dropdown si se hace clic fuera de él
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        referenceRef.current?.contains(event.target as Node) ||
        popperRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      setIsVisible(false);
    };

    useEffect(() => {
      if (isVisible) {
        document.addEventListener("mousedown", handleDocumentClick);
        update?.(); // Llamamos a update() de Popper.js para corregir la posición
      } else {
        document.removeEventListener("mousedown", handleDocumentClick);
      }
      return () => {
        document.removeEventListener("mousedown", handleDocumentClick);
      };
    }, [isVisible, update]);

    return (
      <div className="relative">
        {/* Botón que abre el Dropdown */}
        <button
          ref={referenceRef}
          type="button"
          className={btnClassName}
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible((prev) => !prev);
          }}
        >
          {button}
        </button>

        {/* Contenido del Dropdown */}
        <div
          ref={popperRef}
          style={{
            ...styles.popper,
            visibility: isVisible ? "visible" : "hidden", // Evita glitches visuales
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
          {...attributes.popper}
          className={`z-50 absolute bg-white dark:bg-[#1b2e4b] shadow-lg rounded-lg overflow-hidden ${
            isVisible ? "block" : "hidden"
          }`}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default Dropdown;
