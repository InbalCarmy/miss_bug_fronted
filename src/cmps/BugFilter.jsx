import { utilService } from "../services/util.service"
import { useEffect, useState, useRef } from 'react'

  const labels = [
    "backend",
    "API",
    "user-data",
    "critical",
    "database",
    "network",
    "frontend",
    "UI",
    "event-listener",
    "performance",
    "memory",
    "auth",
    "token",
    "config",
    "notifications",
    "error-handling",
    "triage",
    "new",
    "pending"
  ]


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
        
        // function handleLabelToggle(label) {
        //     setFilterByToEdit(prevFilter => {
        //         const labels = prevFilter.labels || []
        //         const isLabelSelected = labels.includes(label)

        //         const nwLabels = isLabelSelected
        //             ? labels.filter(l => l !== label)
        //             : [...labels, label]

        //         return { ...prevFilter, labels: nwLabels }
        //     })
        // }

        function handleMultiSelect({ target }) {
    const selectedOptions = Array.from(target.selectedOptions, option => option.value)
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: selectedOptions }))
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

                <div>
                    <label>Labels:</label>
                    {/* <div className="labels-checkbox">
                        {labels.map(label =>(
                            <label key={label} className="label-checkbox">
                                <input type="checkbox"
                                checked= {filterByToEdit.labels?.includes(label) || false} 
                                onChange={() => handleLabelToggle(label)}
                                />
                                <span>{label}</span>
                            </label>
                        ))}
                    </div> */}
                    <select multiple name="labels" value={filterByToEdit.labels} onChange={handleMultiSelect}>
    {labels.map(label => (
        <option key={label} value={label}>{label}</option>
    ))}
</select>
                </div>

            </form>

            </section>
        )
        
}

