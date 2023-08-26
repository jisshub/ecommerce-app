import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/product';

interface Rating {
    rate: number;
    count: number;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

const LandingPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const productsList = await getProducts();
                setProducts(productsList);

                // Create a list of unique categories for the dropdown
                const uniqueCategories = Array.from(new Set(productsList.map(product => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products]);

    return (
        <div className="landing-page">
            <div className="category-filter">
                <label>Filter by Category: </label>
                <select value={selectedCategory || ''} onChange={e => setSelectedCategory(e.target.value || null)}>
                    <option value="">All</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="products-list">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;

