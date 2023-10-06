import MobileSidebar from "./MobileSidebar";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { BsPerson, BsArrowLeft } from "react-icons/bs";

const config = {
  main: {
    bgColor: "bg-white",
    leftContent: (
      <div className="flex items-center bg-white justify-between px-2 py-1">
        <MobileSidebar />
        <div className="flex items-center">
          <img src="./src/assets/logo.png" width={34} height={34} alt="Logo" />
          <h2 className="text-indigo-400 font-bold text-2xl">Brand</h2>
        </div>
      </div>
    ),
    rightContent: (
      <div className="flex items-center gap-2">
        <AiOutlineShoppingCart size={26} />
        <BsPerson size={26} />
      </div>
    ),
    bottomContent: (
      <div className="px-6 my-3">
        <div className="bg-indigo-50 border-2 mb-5 text-gray-500 flex items-center rounded px-2 border-gray-300">
          <AiOutlineSearch size={20} />
          <input
            type="text"
            className="outline-none w-56 px-2 py-[6px] bg-indigo-50 "
            placeholder="Search"
          />
        </div>

        <div className="horizontal-scroll-container">
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            All Category
          </a>
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            Gadgets
          </a>
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            Clothes
          </a>
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            accessories
          </a>
        </div>
      </div>
    ),
  },
  detail: {
    bgColor: "bg-rose-200",
    leftContent: (
      <div className="flex gap-1 items-center">
        <BsArrowLeft size={22} />
      </div>
    ),
    rightContent: (
      <div className="flex items-center gap-2">
        <AiOutlineShoppingCart size={24} />
        <BsPerson size={24} />
      </div>
    ),
  },
  itemlist: {
    bgColor: "bg-rose-200",
    leftContent: (
      <div className="flex gap-3 items-center">
        <BsArrowLeft size={22} />
        <div className="logo flex items-center">
          <h2 className="font-semibold">Mobile accessory</h2>
        </div>
      </div>
    ),
    rightContent: (
      <div className="flex items-center gap-2">
        <AiOutlineShoppingCart size={24} />
        <BsPerson size={24} />
      </div>
    ),
    bottomContent: (
      <div className="px-6 my-3">
        <div className="bg-indigo-50 border-2 mb-5 text-gray-500 flex items-center rounded px-2 border-gray-300">
          <AiOutlineSearch size={20} />
          <input
            type="text"
            className="outline-none w-56 px-2 py-[6px] bg-indigo-50 "
            placeholder="Search"
          />
        </div>

        <div className="horizontal-scroll-container">
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            All Category
          </a>
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            Gadgets
          </a>
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            Clothes
          </a>
          <a href="#" className="bg-[#EFF2F4] px-2 py-1  text-[#0D6EFD] rounded">
            accessories
          </a>
        </div>
      </div>
    ),
  },
  cart: {
    bgColor: "bg-rose-200",
    leftContent: (
      <div className="flex gap-3 items-center">
        <BsArrowLeft size={22} />
        <h2 className="font-semibold">Shopping Cart</h2>
      </div>
    ),
    rightContent: null,
  },
};

const MobileNav = () => {
  const toShow = "main"; // Change this to select the desired configuration

  const { leftContent, rightContent, bottomContent } = config[toShow];

  return (
    <nav className={`bg-white mb-5`}>
      <div className={`flex items-center  justify-between px-2 py-2`}>
        {leftContent}
        {rightContent}
      </div>
      {bottomContent}
    </nav>
  );
};

export default MobileNav;
