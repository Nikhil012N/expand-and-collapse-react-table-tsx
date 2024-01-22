import { useState } from "react";
import '../App.css';
import axios from "axios";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
const Search = () => {
  type Products = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  };
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchData, setSearchData] = useState<Products[]>([]);
  const handleChange = (e:any) => {
    e.preventDefault();
    setSearchInput(e.target.value)
    axios
    .get<{ products: Products[] }>(
      `https://dummyjson.com/products/search?q=${searchInput}`
    )
    .then((response) => setSearchData(response?.data?.products));
  };

  return (
    <>
      <TextField
        type="text"
        id="message"
        name="message"
        className="search-hover"
        placeholder="Search here....."
        onChange={handleChange}
        value={searchInput}
        size="small"
      />
      {searchInput.length>0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>DISCOUNT</TableCell>
              <TableCell>RATING</TableCell>
              <TableCell>STOCK</TableCell>
              <TableCell>BRAND</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>THUMBNAIL</TableCell>
              <TableCell>IMAGES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchData?.map((productdata: Products, indexd: number) => {
              return (
                <TableRow key={indexd}>
                  <TableCell>{productdata?.id}</TableCell>
                  <TableCell>{productdata?.title}</TableCell>
                  <TableCell>{productdata?.description}</TableCell>
                  <TableCell>{productdata?.price}</TableCell>
                  <TableCell>{productdata?.discountPercentage}</TableCell>
                  <TableCell>{productdata?.rating}</TableCell>
                  <TableCell>{productdata?.stock}</TableCell>
                  <TableCell>{productdata?.brand}</TableCell>
                  <TableCell>{productdata?.category}</TableCell>
                  <TableCell>
                    {productdata?.thumbnail && (
                      <img
                        src={productdata?.thumbnail}
                        alt={productdata?.thumbnail}
                        height="200"
                        width="200"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {productdata?.images &&
                      productdata?.images.map((image) => {
                        return (
                          <img
                            src={image}
                            alt={image}
                            height="100"
                            width="100"
                          />
                        );
                      })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};
export default Search;
