import React, { useEffect, useState } from 'react'
import { ProductStore } from '../Store/ProductStore'
import Spinner from 'react-bootstrap/Spinner'

const HomePage = () => {
    const { product, error, loading, fetchProducts, updateProduct, deleteProduct } = ProductStore()
    const [isUpdate, setIsUpdate] = useState(false)
    const [productData, setProductData] = useState({
        id: '',
        name: '',
        price: '',
        image: ''
    })

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProduct(productData.id, productData);
        console.log('Updated Product:', productData);
        setIsUpdate(false);
    };

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const handleEditClick = (item) => {
        setProductData({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image
        })
        setIsUpdate(true)
    }

    return (
        <div className="min-h-screen p-4">
            {/* Spinner */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {/* Error message */}
            {error && <div className="text-red-600 text-center text-lg">{error}</div>}

            {/* Product Grid */}
            {!loading && product.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {product.map((item) => (
                        <div key={item.id} className="border p-4 rounded-xl shadow-md hover:shadow-lg transition duration-200">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-contain rounded-md mb-4"
                            />
                            <h2 className="text-lg font-semibold text-red-500 pb-2">{item.name}</h2>
                            <p className="text-gray-500">${item.price}</p>
                            <button onClick={() => deleteProduct(item.id)}>
                                🗑️
                            </button>
                            <button onClick={() => handleEditClick(item)}>
                                ✏️
                            </button>

                            {/* Modal */}
                            {isUpdate && productData.id === item.id && (
                                <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-transparent p-6 rounded-lg shadow-lg w-[400px]">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl font-semibold">Update Product</h2>
                                            <button onClick={() => setIsUpdate(false)} className="text-gray-500 hover:text-black">✖</button>
                                        </div>

                                        <form onSubmit={handleUpdate}>
                                            <div className="mb-3">
                                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                                <input
                                                    type="text"
                                                    value={productData.name}
                                                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                                                    className="w-full border px-3 py-2 rounded"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="block text-sm font-medium mb-1">Price</label>
                                                <input
                                                    type="number"
                                                    value={productData.price}
                                                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                                                    className="w-full border px-3 py-2 rounded"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                                <input
                                                    type="text"
                                                    value={productData.image}
                                                    onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                            </div>

                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsUpdate(false)}
                                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 text-lg mt-6">No items to show</div>
            )}
        </div>
    )
}

export default HomePage
