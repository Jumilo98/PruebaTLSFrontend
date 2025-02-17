import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { usePopper } from "react-popper";

interface DropdownProps {
    button: React.ReactNode;
    children: React.ReactNode;
    btnClassName?: string;
    placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    offset?: [number, number];
}

export interface DropdownRef {
    close: () => void;
}

const Dropdown = forwardRef<DropdownRef, DropdownProps>(
    ({ button, children, btnClassName, placement = "bottom-end", offset = [0, 8] }, ref) => {
        const [visibility, setVisibility] = useState(false);
        const referenceRef = useRef<HTMLButtonElement | null>(null);
        const popperRef = useRef<HTMLDivElement | null>(null);

        const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
            placement,
            modifiers: [
                {
                    name: "offset",
                    options: { offset },
                },
            ],
        });

        const handleDocumentClick = (event: MouseEvent) => {
            if (referenceRef.current?.contains(event.target as Node) || popperRef.current?.contains(event.target as Node)) {
                return;
            }
            setVisibility(false);
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleDocumentClick);
            return () => {
                document.removeEventListener("mousedown", handleDocumentClick);
            };
        }, []);

        useImperativeHandle(ref, () => ({
            close: () => setVisibility(false),
        }));

        return (
            <>
                <button
                    ref={referenceRef}
                    type="button"
                    className={btnClassName}
                    onClick={() => setVisibility(!visibility)}
                >
                    {button}
                </button>

                {visibility && (
                    <div ref={popperRef} style={styles.popper} {...attributes.popper} className="z-50">
                        {children}
                    </div>
                )}
            </>
        );
    }
);

export default Dropdown;
