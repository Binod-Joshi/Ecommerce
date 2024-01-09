import React, { useState } from 'react';
import { InputBase, Box } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSearchesProduct } from '../store/productRelated/productHandle';

const Search = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        dispatch(getSearchesProduct(searchTerm));
    };

    return (
        <>
            <SearchContainer>
                <InputSearchBase
                    placeholder="Search for products, brands and more"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <SearchIconWrapper>
                    <SearchIcon sx={{ color: "#4d1c9c" }} />
                </SearchIconWrapper>
            </SearchContainer>
           <div className='homeMode'>
           </div>
        </>
    );
};

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;

  @media (max-width: 768px) {
    width: 50vw;
    border-radius:6px;
  }
`;

const SearchIconWrapper = styled(Box)`
  display:flex;
  align-items:center;
  justify-content:center;
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;

  @media (max-width: 768px) {
    width: 80vw;
    font-size:16px;
    
  }
`;

export default Search;
