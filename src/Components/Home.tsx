import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
// import Search from "./Search";
const Home = () => {
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
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [active, setActive] = useState<number>(-1);
  const [searchInput, setSearchInput] = useState<string>("");
  const[sort,setSort] =useState<boolean>(false);
  useEffect(() => {
    axios
      .get<string[]>("https://dummyjson.com/products/categories")
      .then((response) => setCategory(response?.data));
      console.log("useEffect catergory",category)
    axios
      .get<{ products: Products[] }>("https://dummyjson.com/products")
      .then((response) => setProducts(response?.data?.products));
  }, []);

  console.log("category length", category.length);
  console.log("expandRows.length", expandedRows.length);
  const handleClick = (clickedIndex: number) => {
    if (expandedRows.includes(clickedIndex)) {setExpandedRows(expandedRows.filter((element) => element !== clickedIndex));} 
    else {setExpandedRows([...expandedRows, clickedIndex]);}
  };
  const handlerExpand = () => {
    if (category.length !== expandedRows.length) {
      let i: number;
      const catArray = [];
      for (i = 0; i < category.length; i++) {
        catArray.push(i);
      }
      setExpandedRows(catArray);
    } else {
      setExpandedRows([]);
    }
  };

  const handleChange = (e: any) => {
    setSearchInput(e.target.value);
    const filtered = category.filter((data) => {
      return e.target.value !== "" && data.indexOf(e.target.value) >= 0;
    });
    console.log("value", filtered);
    const indexFilter: number[] = [];
    filtered.length !== 0 &&
      category.forEach((data, index: number) => {
        if (filtered.includes(data)) {
          return indexFilter.push(index);
        }
      });
    console.log("fitlered index", indexFilter);
    indexFilter.length !== 0
      ? setExpandedRows(indexFilter)
      : setExpandedRows([]);
    //-----------------------------------------------------------------------------------search code--------------------------------------------------------------------------------------------------------------------------
    // setSearchInput(e.target.value)
    // const myIndex:number = category.indexOf(e.target.value);
    // console.log("myindex",myIndex);
    // myIndex!==-1 ? expandedRows.push(myIndex):setExpandedRows([]);
  };

  const handlerSort=(e:any)=>{
   setSort(!sort);
   if(sort===true){
    const sortedCategory=[...category].sort();
    setCategory(sortedCategory);}
    else{
      const sortedCategory=[...category].sort((a, b) => {
        return b.localeCompare(a)
    });
      setCategory(sortedCategory);
    }
  };

  return (
    <>
      {/* <Search/> */}
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="text" onClick={handlerExpand}>
                {category.length !== expandedRows.length ? "+" : "-"}
              </Button>
            </TableCell>
            <TableCell>Category &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
               <Button type="button" variant="text" onClick={handlerSort}>{sort?"ASC":"DESC"}</Button>
               </TableCell>
            <TableCell>Dropdown</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category?.map((data: string, index: number) => {
            return (
              <>
                <TableRow key={index}>
                  <TableCell>{index + 1} </TableCell>
                  <TableCell>{data}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClick(index);
                        setActive(active === index ? -1 : index);
                      }}
                    >
                      {expandedRows.includes(index) ? "Hide" : "Show"}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows.includes(index) ? (
                  <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
                    <TableRow>
                      <TableCell colSpan={3}>
                        {
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
                              {products?.map((productdata: Products, indexd: number) => {
                                  if (productdata?.category === data) {
                                    return (
                                      <TableRow key={indexd}>
                                        <TableCell>{productdata?.id}</TableCell>
                                        <TableCell>
                                          {productdata?.title}
                                        </TableCell>
                                        <TableCell>
                                          {productdata?.description}
                                        </TableCell>
                                        <TableCell>
                                          {productdata?.price}
                                        </TableCell>
                                        <TableCell>
                                          {productdata?.discountPercentage}
                                        </TableCell>
                                        <TableCell>
                                          {productdata?.rating}
                                        </TableCell>
                                        <TableCell>
                                          {productdata?.stock}
                                        </TableCell>
                                        <TableCell>
                                          {productdata?.brand}
                                        </TableCell>
                                        <TableCell>
                                          {productdata?.category}
                                        </TableCell>
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
                                  }
                                }
                              )}
                            </TableBody>
                          </Table>
                        }
                      </TableCell>
                    </TableRow>
                  </Paper>
                ) : null}
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Home;
