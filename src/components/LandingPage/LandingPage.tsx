import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/product';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './style.css';

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
    const navigate = useNavigate();

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

    const handleProductDetails = (productId: number) => {
        navigate('/product/' + productId);
    }

    return (
        <>
            <Header />
                <div className="container mt-5">
                    <div className="category-filter mb-4">
                        <label>Filter by Category: </label>
                        <select value={selectedCategory || ''} onChange={e => setSelectedCategory(e.target.value || null)}>
                            <option value="">All</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="row">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="col-md-4 mb-4 d-flex align-items-stretch"> 
                                <div 
                                    className="card product-card"
                                    onClick={()=>handleProductDetails(product.id)}
                                    >
                                    <img src={product.image} alt={product.title} className="card-img-top img-fluid" />
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate">{product.title}</h5>
                                        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            <Footer />
        </>
    );
};

export default LandingPage;

