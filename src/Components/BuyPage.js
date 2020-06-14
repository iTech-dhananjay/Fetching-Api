import React ,{useState,useEffect} from 'react'
import Axios from 'axios'
import CartItem  from './CartItem'

import {random,commerce} from 'faker'
import {Container,Row,Col} from 'reactstrap'


//insert your key here
const apiKey="563492ad6f91700001000001de4b6b2ed8ac4d96a113bc3c95f27acf"
const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";

// const localurl=''
  // const fetchPhotos=async()=>{
    //   const {data} =await Axios.get(localurl)




const BuyPage =({addInCart})=>{

  const [product,setProduct]=useState([])
  //we need photo of product
 const fetchPhotos=async()=>{
   const { data } = await Axios.get(url, {
			headers: {
				Authorization: apiKey
			}
		});
    const {photos}=data;
      
    const allProduct = photos.map(photo => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),
      productPrice: commerce.price(),
      id: random.uuid()
    }));


     setProduct(allProduct)

  }
    
  useEffect(() => {
    fetchPhotos();
  }, []);

        return (
          <Container fluid>
            <h1 className="text-success text-center">Buy Page</h1>
            <Row>
              {product.map(product => (
                <Col md={4} key={product.id}>
                  <CartItem product={product} addInCart={addInCart} />
                </Col>
              ))}
            </Row>
          </Container>
        );
}
export default BuyPage