import { NavLink } from 'react-router-dom';

export default function ViewCatalogue({bg, text}) {
    return  (
        <div className={` border-4 border-${text} bg-${bg} w-full mx-auto md:w-full
        lg:border-${text}
        `}>
            <NavLink to="/services" className={` block font-bold text-${text} p-2 hover:bg-gray-900 hover:text-slate-200 md:text-lg 
            lg:text-${text} lg:hover:bg-gray-900 lg:hover:text-slate-200`}>VIEW CATALOGUE</NavLink>
        </div>
    );
}