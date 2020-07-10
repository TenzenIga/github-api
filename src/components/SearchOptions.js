import React, {useState} from 'react'
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Input, InputGroup, InputGroupButtonDropdown} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

export default function SearchOptions(props) {
    const { setStars, handleSelect, handlePrefix, starsPrefix, language, stars, startDate, setStartDate } = props;


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [starsDropdownOpen, setStarsDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleStarsDropdown = () => setStarsDropdownOpen(!starsDropdownOpen);

     

    return (
        <div className="options-panel">
            <div className="options-panel__item" >
                <span>Language</span>
                <Dropdown  size="sm" isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                    {language}
                    </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={(e)=>handleSelect(e)} >Javascript</DropdownItem>
                            <DropdownItem onClick={(e)=>handleSelect(e)} >Python</DropdownItem>
                            <DropdownItem onClick={(e)=>handleSelect(e)} >Ruby</DropdownItem>
                            <DropdownItem onClick={(e)=>handleSelect(e)} >Java</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="options-panel__item">
                    <InputGroup>
                        <InputGroupButtonDropdown addonType="append" isOpen={starsDropdownOpen} toggle={toggleStarsDropdown}>
                        <DropdownToggle caret>
                            { starsPrefix === '<' ? 'Less than' : 'More than' }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={(e)=>handlePrefix(e)} >More than</DropdownItem>
                            <DropdownItem onClick={(e)=>handlePrefix(e)} >Less than</DropdownItem>
                        </DropdownMenu>
                        </InputGroupButtonDropdown>
                        <Input value={stars} onChange={(e)=>setStars(e.target.value)} />
                </InputGroup>
                <span>stars</span>
            </div>
            <div className="options-panel__item">
                <span>Since</span>
                <InputGroup>
                    <DatePicker selected={startDate} customInput={<Input />} onChange={date => setStartDate(date)} />   
                </InputGroup>  
            </div>
        </div>
    )
}

SearchOptions.proptype = {
    heandlePrefix: PropTypes.func,
    language: PropTypes.string,
    handleSelect: PropTypes.func, 
    setStars: PropTypes.func,
    stars: PropTypes.number,
    startDate: PropTypes.string,
    setStartDate:PropTypes.func,
    starsPrefix: PropTypes.string
}