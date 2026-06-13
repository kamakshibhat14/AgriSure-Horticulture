import { useNavigate } from "react-router-dom";

function Navbar() {

const navigate = useNavigate();

return (

<nav className="bg-emerald-700 text-white shadow-lg">

<div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

{/* Logo */}
<h1
onClick={()=>navigate("/")}
className="text-lg font-semibold cursor-pointer"
>
🌾 Horticulture Department Portal
</h1>

{/* Menu */}
<div className="flex gap-8 text-sm font-medium">

<button
onClick={()=>navigate("/")}
className="hover:text-lime-200 transition"
>
Home
</button>

<button
onClick={()=>navigate("/about")}
className="hover:text-lime-200 transition"
>
About
</button>

<button
onClick={()=>navigate("/login")}
className="hover:text-lime-200 transition"
>
Admin
</button>

</div>

</div>

</nav>

);

}

export default Navbar;