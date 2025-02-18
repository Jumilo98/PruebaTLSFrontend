import { Menu } from "@headlessui/react";

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  btnClassName?: string;
}

const Dropdown = ({ button, children, btnClassName = "" }: DropdownProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className={btnClassName}>{button}</Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50">
        {children}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
