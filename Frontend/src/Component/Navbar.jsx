import React from 'react'
import { ProductStore } from '../Store/ProductStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [productData, setProductData] = React.useState({
        name: '',
        price: '',
        image: ''
    })
    const navigate = useNavigate()
    const {createProduct,loading}  =ProductStore()
    const handleForm = (e) => {
        e.preventDefault();
        createProduct(productData);
        navigate("/")
    }
    return (

        <div className="navbar bg-base-100 shadow-sm flex justify-evenly md:px-40 px:8">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex items-center-center gap-4" >
                <div className='pt-1.5 border rounded-2xl px-2 py-1' onClick={() => setIsOpen(!isOpen)}>Create Product</div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {isOpen && (
                <div>
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h2 className="text-2xl font-bold mb-4">Create Product</h2>
                            <form onSubmit={handleForm}>
                                <input type="text" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} placeholder="Product Name" className="input input-bordered w-full mb-4" />
                                <input type="number" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} placeholder="Price" className="input input-bordered w-full mb-4" />
                                <input type="text" value={productData.image} onChange={(e) => setProductData({ ...productData, image: e.target.value })} placeholder="Image URL" className="input input-bordered w-full mb-4" />
                                <button type="submit" className="btn btn-primary w-full">{loading ? <div>Creating ...</div>: <div>Create</div> }</button>
                            </form>
                            <div className="modal-action">
                                <button onClick={() => setIsOpen(false)} className="btn">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Navbar