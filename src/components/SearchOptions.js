import React, {useState} from 'react'
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Input, InputGroup, InputGroupButtonDropdown} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function SearchOptions() {

    const [language, setLanguage ] = useState('Any');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [starsDropdownOpen, setStarsDropdownOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleSelect = (e)=>{
        setLanguage(e.target.innerText)
    }
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const toggleStarsDropdown = () => setStarsDropdownOpen(!starsDropdownOpen);

    return (
        <div className="options-panel">
            <div className="options-panel__item" >
                <span>
                    Language
                </span>
                <Dropdown  size="sm" isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                    {language}
                    </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleSelect} >Javascript</DropdownItem>
                            <DropdownItem onClick={handleSelect} >Python</DropdownItem>
                            <DropdownItem onClick={handleSelect} >Ruby</DropdownItem>
                            <DropdownItem onClick={handleSelect} >Java</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="options-panel__item">
                    <InputGroup>
                        <InputGroupButtonDropdown addonType="append" isOpen={starsDropdownOpen} toggle={toggleStarsDropdown}>
                        <DropdownToggle caret>
                            More than
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>More than</DropdownItem>
                            <DropdownItem>Less than</DropdownItem>
                        </DropdownMenu>
                        </InputGroupButtonDropdown>
                        <Input />
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
