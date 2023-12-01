import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import ProductComponent from './ProductComponent';
import {setProducts} from '../redux/actions/productActions';
import axios from 'axios';

const ProductListing = () => {
    const products = useSelector((state)=>state);
    const dispatch = useDispatch();

    const fetchProducts = async ()=>{
        const resp = await axios.get('https://fakestoreapi.com/products')
            .catch((err)=>{console.log(err);});

        dispatch(setProducts(resp.data))
    }

    useEffect(()=>{
        fetchProducts();
    },[])

    console.log("Products",products);
  return (
    <div className='ui grid conatainer'>
        <ProductComponent></ProductComponent>
    </div>
  )
}

export default ProductListing