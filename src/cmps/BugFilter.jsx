import { utilService } from "../services/util.service"
import { useEffect, useState, useRef } from 'react'


export function BugFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy})
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 300)).current

        useEffect(() => {
            onSetFilterDebounce(filterByToEdit)
        },[filterByToEdit])

        function handleChange({ target }) {
            let { value, name: field, type } = target
            value = type === 'number' ? +value : value
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        }        

        console.log('filterBy from front:', filterBy);
        


        return(
            <section className="bug-filter">
            <h3>Filter Bugs 🐞</h3>
            <form >
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text"
                        id="title"
                        name="txt"
                        placeholder="By title"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="minSeverity">Min severity:</label>
                    <input type="number"
                        id="minSverity"
                        name="minSeverity"
                        placeholder="By min Severity"
                        value={filterByToEdit.minSeverity || ''}
                        onChange={handleChange}
                    />
                </div>

            </form>

            </section>
        )
        
}

