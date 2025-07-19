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
                <a className="btn btn-ghost text-xl">EZ Store</a>
            </div>
            <div className="flex items-center-center gap-4" >
                <div className='pt-1.5 border rounded-2xl px-2 py-1' onClick={() => setIsOpen(!isOpen)}>Create Product</div>
                

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